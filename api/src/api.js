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
    } else {
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

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
