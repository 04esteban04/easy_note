import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import pkg from 'pg';
import fs from 'fs';
import path from 'path';

const SECRET_KEY = process.env.SECRET_KEY;

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { 
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.resolve('certs', 'ca.pem')).toString(),
    },
});

export default pool;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.SERVER_BASE_URL,
    credentials: true,
}));

const authenticateToken = (req, res, next) => {

    const token = req.cookies.userId; 

    if (!token) {
        return res.status(401).json({ success: false, message: 'Session expired. Try to login!' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token. You are not in session. Try to login' });
        }
        
        req.user = user; 
        next();
    });

};

const formatDateToCST = () => {

    const now = new Date();
    
    const cstOffset = -6;
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const cstDate = new Date(utcTime + cstOffset * 3600000);

    const day = String(cstDate.getDate()).padStart(2, '0');
    const month = String(cstDate.getMonth() + 1).padStart(2, '0');
    const year = String(cstDate.getFullYear());
    const hours = cstDate.getHours();
    const minutes = String(cstDate.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 || 12; 
    
    return `${month}/${day}/${year} ${formattedHours}:${minutes} ${ampm} (CST)`;

};

app.post('/api/login', async (req, res) => {

    const { username, password } = req.body;

    try {

        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [username]
        );
        
        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        } 
        
        else {

            const user = result.rows[0];

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                
                const token = jwt.sign({ username: user.email }, SECRET_KEY, { expiresIn: '1hr' });

                res.cookie('userId', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 3600000,
                });

                return res.status(200).json({ success: true, message: 'Login successful' });
            } 
            
            else {
                return res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
        }

    } 
    
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, message: 'An error occurred during login' });
    }

});

app.post('/api/register', async (req, res) => {
    
    const { username, password } = req.body;

    try {
        
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [username]
        );

        if (result.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertResult = await pool.query(
            `INSERT INTO users (email, password) VALUES ($1, $2)`,
            [username, hashedPassword]
        );

        return res.status(201).json({ success: true, message: 'User registered successfully'});

    } 
    
    catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ success: false, message: 'An error occurred during registration' });
    }

});

app.post('/api/logout', authenticateToken, (req, res) => {

    res.clearCookie('userId', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    });

    res.status(200).json({ success: true, message: 'User logged out successfuly'});

});

app.get('/api/checkUser', authenticateToken, (req, res) => {
    
    res.status(200).json({ success: true, message: 'User already in session' });

});

app.get('/api/getNotes', authenticateToken, async (req, res) => {

    try {

        const result = await pool.query(
            `SELECT note_id, title, content, tags, color, updated FROM notes 
            WHERE user_id = (SELECT id FROM users WHERE email = $1)
            ORDER BY note_id ASC`,
            [req.user.username]
        );
        
        if (result.rows.length > 0) {
            return res.status(200).json({ success: true, userNotes: result.rows });
        } else {
            return res.status(404).json({ success: false, message: 'No notes found for this user.' });
        }

    } 
    
    catch (error) {
        console.error('Error retrieving notes:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while retrieving notes from db' });
    }

});

app.post('/api/createNote', authenticateToken, async (req, res) => {

    const { title, content, tags, color } = req.body;
  
    if (!title || !content) {
        return res.status(400).json({ 
            success: false, 
            message: 'Title and content are required to create a new note.' 
        });
    }
  
    try {
        
        const result = await pool.query(
            `SELECT id FROM users WHERE email = $1`, 
            [req.user.username]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({success: false, message: 'User not found.' });
        }

        const userId = result.rows[0].id;

        const insertResult = await pool.query(
            `INSERT INTO notes (user_id, title, content, tags, color, updated)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING note_id, title, content, tags, color, updated`, 
            [userId, title, content, tags, color, formatDateToCST()]
        );

        const newNote = insertResult.rows[0];

        res.status(200).json({ 
            success: true, 
            message: "Note created successfully.",
            noteCreated: newNote
        });

    } 
    
    catch (error) {
        console.error('Error creating note:', error);

        res.status(500).json({ 
            success: false, 
            message: 'An error occurred while creating the note in database.' 
        });

    }

});  

app.put('/api/updateNote', authenticateToken, async (req, res) => {
    
    const { note_id, title, content, tags, color } = req.body;

    if (!note_id || !title || !content) {
        return res.status(400).json({ 
            success: false, 
            message: "Title and content are required to update a note." 
        });
    }

    try {

        const result = await pool.query(
            `SELECT id FROM users WHERE email = $1`, 
            [req.user.username]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'User not found.' });
        }

        const userId = result.rows[0].id;

        const updateResult = await pool.query(
            `UPDATE notes SET title = $1, content = $2, tags = $3, color = $4, updated = $5
             WHERE note_id = $6 AND user_id = $7 RETURNING *`, 
            [title, content, tags, color, formatDateToCST(), note_id, userId]
        );

        const updatedNote = updateResult.rows[0];

        res.status(200).json({ 
            success: true, 
            message: "Note updated successfully.", 
            noteUpdated: updatedNote
        });

    } 
    
    catch (error) {
        console.error('Error updating note:', error);

        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the note in the database.'
        });
    }

});

app.delete('/api/deleteNote', authenticateToken, async (req, res) => {
    
    const { note_id } = req.body;

    try {
        
        const noteResult = await pool.query(
            `SELECT * FROM notes WHERE note_id = $1 AND user_id = (SELECT id FROM users WHERE email = $2)`,
            [note_id, req.user.username]
        );

        if (noteResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Note not found.' });
        }

        await pool.query(
            `DELETE FROM notes WHERE note_id = $1 AND user_id = (SELECT id FROM users WHERE email = $2)`,
            [note_id, req.user.username]
        );

        res.status(200).json({ success: true, message: 'Note deleted successfully.' });
    } 
    
    catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the note from database.' });
    }

});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
