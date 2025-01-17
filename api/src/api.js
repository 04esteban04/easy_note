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

/* const notes = [
    {
        id: 1,
        title: "Note 1",
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, id doloremque! Minus dolor rerum omnis. Similique necessitatibus sit beatae alias nisi veritatis repudiandae, corporis officiis at, adipisci illo! Repellat, at?",
        tags: "personal",
        color: "#FFFFFF",
        updated: "2021-09-01"
    },
    {
        id: 2,
        title: "Note 2",
        content: "Content 2",
        tags: "test1, test2",
        color: "#FFFFFF",
        updated: "2021-09-02"
    }
]; */

const notes = [
    {
        id: 1,
        title: "Grocery List",
        content: "Milk, Eggs, Bread, Butter, Cheese",
        tags: "personal, shopping",
        color: "#FFB6C1",
        updated: "2023-01-10"
    },
    {
        id: 2,
        title: "Meeting Notes",
        content: "Discuss Q1 revenue, action items, and team goals.",
        tags: "work, important",
        color: "#FFD700",
        updated: "2023-02-15"
    },
    {
        id: 3,
        title: "Workout Plan",
        content: "Monday: Cardio, Tuesday: Weights, Wednesday: Rest",
        tags: "health, fitness",
        color: "#98FB98",
        updated: "2023-03-01"
    },
    {
        id: 4,
        title: "Vacation Ideas",
        content: "Explore Bali, visit Iceland, tour Japan.",
        tags: "travel, leisure",
        color: "#87CEEB",
        updated: "2023-03-15"
    },
    {
        id: 5,
        title: "Book List",
        content: "1984, Brave New World, The Great Gatsby.",
        tags: "reading, wishlist",
        color: "#FF6347",
        updated: "2023-04-01"
    },
    {
        id: 6,
        title: "Project Milestones",
        content: "Complete prototype, schedule user testing, finalize product.",
        tags: "work",
        color: "#B0E0E6",
        updated: "2023-04-10"
    },
    {
        id: 7,
        title: "Daily To-Do",
        content: "Check emails, attend standup, review PRs.",
        tags: "tasks, work",
        color: "#FFA07A",
        updated: "2023-04-15"
    },
    {
        id: 8,
        title: "Dinner Recipes",
        content: "Spaghetti carbonara, chicken curry, grilled salmon.",
        tags: "food",
        color: "#FA8072",
        updated: "2023-05-01"
    },
    {
        id: 9,
        title: "Birthday Plans",
        content: "Order cake, book venue, send invites.",
        tags: "personal, events",
        color: "#FFE4B5",
        updated: "2023-05-15"
    },
    {
        id: 10,
        title: "Photography Tips",
        content: "Golden hour lighting, rule of thirds, use a tripod.",
        tags: "hobby, photography",
        color: "#D8BFD8",
        updated: "2023-06-01"
    },
    {
        id: 11,
        title: "Coding Notes",
        content: "Remember to test edge cases, use descriptive variable names.",
        tags: "programming, work",
        color: "#FFFACD",
        updated: "2023-06-15"
    },
    {
        id: 12,
        title: "Party Playlist",
        content: "Top hits, 80s classics, chill vibes.",
        tags: "music, fun",
        color: "#E6E6FA",
        updated: "2023-07-01"
    },
    {
        id: 13,
        title: "Packing List",
        content: "Clothes, toiletries, phone charger, passport.",
        tags: "travel",
        color: "#ADD8E6",
        updated: "2023-07-15"
    },
    {
        id: 14,
        title: "Weekend Goals",
        content: "Finish painting, clean garage, call parents.",
        tags: "personal, goals",
        color: "#F08080",
        updated: "2023-08-01"
    },
    {
        id: 15,
        title: "Budget Tracker",
        content: "Income: $2000, Expenses: Rent, Groceries, Utilities.",
        tags: "finance",
        color: "#90EE90",
        updated: "2023-08-10"
    },
    {
        id: 16,
        title: "Quotes",
        content: "Inspiration: 'The only limit is your mind.'",
        tags: "motivation",
        color: "#FFF8DC",
        updated: "2023-08-15"
    },
    {
        id: 17,
        title: "Study Plan",
        content: "Math: 2 hours, Science: 1 hour, History: 30 minutes.",
        tags: "education",
        color: "#F5DEB3",
        updated: "2023-09-01"
    },
    {
        id: 18,
        title: "Garden Schedule",
        content: "Water plants on Mon, Wed, Fri. Fertilize monthly.",
        tags: "hobby, gardening",
        color: "#7FFFD4",
        updated: "2023-09-10"
    },
    {
        id: 19,
        title: "Event Checklist",
        content: "Book caterer, finalize guest list, choose decorations.",
        tags: "events, planning",
        color: "#FFDAB9",
        updated: "2023-09-15"
    },
    {
        id: 20,
        title: "Language Practice",
        content: "French verbs, Spanish vocabulary, German phrases.",
        tags: "learning",
        color: "#B0C4DE",
        updated: "2023-10-01"
    },
    {
        id: 21,
        title: "Car Maintenance",
        content: "Oil change, tire pressure, brake inspection.",
        tags: "tasks, car",
        color: "#EEE8AA",
        updated: "2023-10-10"
    },
    {
        id: 22,
        title: "Tech Wishlist",
        content: "Laptop, headphones, ergonomic chair.",
        tags: "wishlist, tech",
        color: "#8FBC8F",
        updated: "2023-10-15"
    },
    {
        id: 23,
        title: "Volunteer Work",
        content: "Charity event, food bank shift, park cleanup.",
        tags: "community",
        color: "#FFD700",
        updated: "2023-11-01"
    },
    {
        id: 24,
        title: "Pet Care",
        content: "Feed twice daily, walk at 7 AM and 6 PM, vet appointment.",
        tags: "pets",
        color: "#FFC0CB",
        updated: "2023-11-10"
    },
    {
        id: 25,
        title: "Holiday Prep",
        content: "Buy gifts, decorate tree, send cards.",
        tags: "holiday",
        color: "#FF4500",
        updated: "2023-11-15"
    },
    {
        id: 26,
        title: "Fitness Goals",
        content: "Run 5km, lift heavier weights, improve flexibility.",
        tags: "health",
        color: "#00FA9A",
        updated: "2023-12-01"
    },
    {
        id: 27,
        title: "Travel Plans",
        content: "Check flights, book accommodation, create itinerary.",
        tags: "travel",
        color: "#6495ED",
        updated: "2023-12-10"
    },
    {
        id: 28,
        title: "Gift Ideas",
        content: "Books, gadgets, personalized items.",
        tags: "wishlist",
        color: "#FF69B4",
        updated: "2023-12-15"
    },
    {
        id: 29,
        title: "Meal Prep",
        content: "Chicken stir fry, quinoa salad, fruit snacks.",
        tags: "food",
        color: "#FFD700",
        updated: "2023-12-20"
    },
    {
        id: 30,
        title: "Reflection",
        content: "What went well this year? What to improve next year?",
        tags: "personal, goals",
        color: "#708090",
        updated: "2023-12-25"
    }
];

let noteIdIndex = 2;

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

    const { title, content, tags, color } = req.body;
  
    if (!title || !content) {
        return res.status(400).json({ 
            success: false, 
            message: 'Title and content are required to create a new note.' 
        });
    }
  
    try {
        
        const newNote = {
            id: noteIdIndex + 1 ,
            title,
            content,
            tags,
            color,
            updated: formatDateToCST() 
        };

        notes.push(newNote);

        res.status(200).json({ 
            success: true, 
            message: "Note created successfully.",
            noteCreated: newNote});

        noteIdIndex++;

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
    
    const { id, title, content, tags, color } = req.body;
    
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
        tags,
        color,
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
