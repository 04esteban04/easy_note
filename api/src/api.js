import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const users = [
    {
        username: "asd@asd.com",
        password: "asd"
    } 
];

const notes = [
    {
        id: 1,
        title: "Note 1",
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, id doloremque! Minus dolor rerum omnis. Similique necessitatibus sit beatae alias nisi veritatis repudiandae, corporis officiis at, adipisci illo! Repellat, at?",
        updated: "2021-09-01"
    },
    {
        id: 2,
        title: "Note 2",
        content: "Content 2",
        updated: "2021-09-02"
    }
];

const SECRET_KEY = process.env.SECRET_KEY;

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

app.post('/api/login', (req, res) => {

    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);   

    if (user) {   
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1hr' }); 

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

});

app.post('/api/register', (req, res) => {

    const { username, password } = req.body;

    const userExists = users.some(u => u.username === username);

    if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    users.push({ username, password });
    
    return res.status(201).json({ success: true, message: 'User registered successfully' });

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

app.get('/api/getNotes', (req, res) => {

    res.status(200).json({success: true, userNotes: notes});

});

app.post('/api/createNote', async (req, res) => {

    const { title, content } = req.body;
  
    if (!title || !content) {
        return res.status(400).json({ 
            success: false, 
            message: 'Title and content are required to create a new note.' 
        });
    }
  
    try {
        const newNote = {
            id: notes[notes.length - 1].id + 1 ,
            title,
            content,
            updated: formatDateToCST() 
        };

        notes.push(newNote);

        res.status(200).json({ 
            success: true, 
            message: "Note created successfully.",
            noteCreated: newNote});
    } 
    
    catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred while creating the note.' 
        });
    }

});  

app.put('/api/updateNote', (req, res) => {
    
    const { id, title, content } = req.body;
    
    if (!id || !title) {
        return res.status(400).json({ 
            success: false, 
            message: "Title is required in every note. Try adding one."
        });
    }

    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex === -1) {
        return res.status(404).json({ success: false, message: "Note not found." });
    }

    notes[noteIndex] = {
        ...notes[noteIndex],
        title,
        content,
        updated: formatDateToCST() 
    };

    res.status(200).json({ 
        success: true, 
        message: "Note updated successfully.", 
        note: notes[noteIndex] 
    });

});

app.delete('/api/deleteNote', (req, res) => {
    
    const { id } = req.body;
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
        res.status(200).json({success: true, message: 'Note deleted successfully.'});
    } 
    
    else {
        res.status(404).json({message: 'Note not found.'});
    }

});

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

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
