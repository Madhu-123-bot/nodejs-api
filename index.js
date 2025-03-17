const express = require('express');
const app = express();
const mysql = require('mysql');

// DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'testdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Sample endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// DB health check endpoint
app.get('/api/db-health', (req, res) => {
  db.query('SELECT 1', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'DB connection failed' });
    } else {
      res.json({ message: 'DB is healthy', results });
    }
  });
});

// Server listen
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
