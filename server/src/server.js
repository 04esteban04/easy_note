import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.APPLICATION_BASE_URL,
    credentials: true,
}));

app.post('/auth/login', async (req, res) => {

    try {
        const response = await fetch(process.env.API_LOGIN_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(req.body),
        });

        const cookies = response.headers.get('set-cookie');
        res.setHeader('set-cookie', cookies); 
        
        const data = await response.json();

        if (data.success) {
            res.setHeader('set-cookie', cookies);
        } 
        
        res.json(data);

    } 
    
    catch (error) {
        console.error('Login error in server:', error);
        res.status(500).json({ success: false, message: 'Internal server error (login)' });
    }

});

app.post('/auth/register', async (req, res) => {

    try {
        const response = await fetch(process.env.API_REGISTER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.json(data);
    } 
    
    catch (error) {
        console.error('Register error in server:', error);
        res.status(500).json({ success: false, message: 'Internal server error (register)' });
    }

});

app.post('/auth/logout', async (req, res) => {

    try {
        const response = await fetch(process.env.API_LOGOUT_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Cookie: req.headers.cookie || '',
            },
            credentials: 'include'
        });
        
        const cookies = response.headers.get('set-cookie');
        res.setHeader('set-cookie', cookies);  
        
        const data = await response.json();
        res.json(data);

    } 
    
    catch (error) {
        console.error('Logout error in server:', error);
        res.status(500).json({ success: false, message: 'Internal server error (logout)' });
    }

});

app.get('/auth/checkUser', async (req, res) => {

    try {
        const response = await fetch(process.env.API_CHECK_USER, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Cookie: req.headers.cookie || ''
            },
            credentials: 'include'
        });

        const data = await response.json();
        res.json(data);
    } 
    
    catch (error) {
        console.error('Check user error in server:', error);
        res.status(500).json({ success: false, message: 'Internal server error (checking user)' });
    }

});

app.get('/getNotes', async (req, res) => {

    try {
        const response = await fetch(process.env.API_GET_NOTES, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Cookie: req.headers.cookie || ''
            },
            credentials: 'include'
        });

        const data = await response.json();
        res.json(data);
    } 
    
    catch (error) {
        console.error('Error while getting user notes in server:', error);
        res.status(500).json({ success: false, message: 'Internal server error (getting notes)' });
    }

});

app.post('/createNote', async (req, res) => {
    
    try {
        const response = await fetch(process.env.API_CREATE_NOTE, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Cookie: req.headers.cookie || ''
            },
            credentials: 'include',
            body: JSON.stringify(req.body)
        });
                
        const data = await response.json();
        res.json(data);

    } 
    
    catch (error) {
        console.error('Error while creating new note in server:', error);
        res.status(500).json({ success: false, message: 'Internal server error (create note)' });
    }

});

app.put('/updateNote', async (req, res) => {

    try {
        const response = await fetch(process.env.API_UPDATE_NOTE, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                Cookie: req.headers.cookie || ''
            },
            credentials: 'include',
            body: JSON.stringify(req.body)
        });

        const data = await response.json();      
        res.json(data);
    } 
    
    catch (error) {
        console.error('Error while updating note in server:', error);
        res.status(500).json({ success: false, message: 'Internal server error (updating note)' });
    }

});

app.delete('/deleteNote', async (req, res) => {

    try {
        const response = await fetch(process.env.API_DELETE_NOTE, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                Cookie: req.headers.cookie || ''
            },
            credentials: 'include',
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);
    } 
    
    catch (error) {
        console.error('Error while deleting note in server:', error);
        res.status(500).json({ success: false, message: 'Internal server error (deleting note)' });
    }

});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
