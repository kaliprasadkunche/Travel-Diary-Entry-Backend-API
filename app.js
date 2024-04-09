const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;
const secretKey = 'your_secret_key_1234567890';
console.log("JWT Token : ",jwt);
console.log("Secert_key : ", secretKey);
// Create and connect to SQLite database
const db = new sqlite3.Database(':memory:');

// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS diary_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        date TEXT,
        location TEXT,
        photos TEXT,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
});

// Middleware
app.use(bodyParser.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey); 
        console.log('Decoded Token:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
};



// Routes
// User registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const token = jwt.sign({ id: this.lastID, username: username }, secretKey);
        res.json({ message: 'User registered successfully', token: token });
    });
});

// User login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: row.id, username: row.username }, secretKey);
        res.json({ message: 'Login successful', token: token });
    });
});

// Profile management (example route)
app.get('/profile', authenticateToken, (req, res) => {
    res.json({ userId: req.user.id, username: req.user.username });
});

// CRUD operations on diary entries
// Create diary entry
app.post('/diary', authenticateToken, (req, res) => {
    const { title, description, date, location, photos } = req.body;
    const userId = req.user.id;
    db.run(`INSERT INTO diary_entries (title, description, date, location, photos, user_id) VALUES (?, ?, ?, ?, ?, ?)`, 
           [title, description, date, location, photos, userId], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Diary entry created successfully', entryId: this.lastID });
    });
});

// Read diary entry
app.get('/diary/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    db.get(`SELECT * FROM diary_entries WHERE id = ? AND user_id = ?`, [id, userId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Diary entry not found' });
        }
        res.json(row);
    });
});

// Update diary entry
app.put('/diary/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const { title, description, date, location, photos } = req.body;
    const userId = req.user.id;
    db.run(`UPDATE diary_entries SET title = ?, description = ?, date = ?, location = ?, photos = ? WHERE id = ? AND user_id = ?`, 
           [title, description, date, location, photos, id, userId], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Diary entry updated successfully' });
    });
});

// Delete diary entry
app.delete('/diary/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    db.run(`DELETE FROM diary_entries WHERE id = ? AND user_id = ?`, [id, userId], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Diary entry deleted successfully' });
    });
});

// Documentation
app.get('/documentation', (req, res) => {
    res.send('Documentation will be provided soon');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
