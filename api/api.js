import express from 'express';
import cors from 'cors';
import session from 'express-session';

/* TODO: Check user in session (not being persistent) */

const users = [
    {
        username: "asd@asd.com",
        password: "asd"
    } 
];

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.SERVER_BASE_URL,
    credentials: true,
}));

app.use(session({
    secret: 'super-secret-key', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, 
        secure: false, 
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 
    }
}));

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);   

    if (user) {
        console.log('Session init:', req.session); 

        req.session.user = { username }; 
        
        res.cookie('connect.sid', req.sessionID, {
            httpOnly: true,  
            secure: false,   
            sameSite: 'lax', 
            maxAge: 1000 * 60 * 60, 
        });
        
        console.log('Session after login:', req.session);      
        return res.status(200).json({ success: true, message: 'Login successful' });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

app.post('/api/logout', (req, res) => {
    console.log('Session before logout:', req.session);
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Failed to logout from session' });
            }

            res.clearCookie('connect.sid', {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
            });

            console.log('Session after logout:', req.session);

            return res.status(200).json({ success: true, message: 'Logged out successfully' });
        });
    } else {
        return res.status(400).json({ success: false, message: 'No active session to logout' });
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

app.get('/api/check-session', (req, res) => {
    if (req.session && req.session.user) {
        return res.status(200).json({ isAuthenticated: true });
    }
    
    return res.json({ isAuthenticated: false });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
