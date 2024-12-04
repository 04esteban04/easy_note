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
                'Content-Type': 'application/json',
                Cookie: req.headers.cookie || '',
            },
            credentials: 'include',
            body: JSON.stringify(req.body),
        });

        const cookies = response.headers.get('set-cookie');
        if (cookies) {
            res.setHeader('set-cookie', cookies); 
        }
        
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Login error in server:', error);
        res.status(500).json({ success: false, message: 'Internal server error (login)' });
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
            credentials: 'include',
        });


        const cookies = response.headers.get('set-cookie');
        if (cookies) {
            res.setHeader('set-cookie', cookies);
        }

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Logout error in server:', error);
        res.status(500).json({ success: false, message: 'Internal server error (logout)' });
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
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Register error in server:', error);
        res.status(500).json({ success: false, message: 'Internal server error (register)' });
    }
});

app.get('/check-session', async (req, res) => {
    try {
        const response = await fetch(process.env.API_CHECK_SESSION, {
            method: 'GET',
            credentials: 'include',
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Check session error in server:', error);
        res.status(500).json({ success: false, message: 'Internal server error (check-session)' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
