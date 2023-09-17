const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Menggunakan middleware untuk mengurai body dalam format JSON
app.use(express.json());

// Menggunakan middleware untuk mengurai data formulir (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Middleware CORS
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'idmetafora'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.get('/', (req, res) => {
  return res.json("Hello World");
});

// Method GET di /api/task
app.get('/task', (req, res) => {
  const sql = 'SELECT * FROM task';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Method POST di /api/task
app.post('/task', (req, res) => {
  const { nama_task, id_user, id_status } = req.body;
  const sql = 'INSERT INTO task (nama_task, id_user, id_status) VALUES (?, ?, ?)';
  db.query(sql, [nama_task, id_user, id_status], (err, result) => {
    if (err) {
      console.error('Error creating task: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json({ message: 'Task created successfully', id: result.insertId });
  });
});

// Method POST di /api/status
app.post('/status', (req, res) => {
  const { nama_status, id_user } = req.body;
  const sql = 'INSERT INTO status (nama_status, id_user) VALUES (?, ?)';
  db.query(sql, [nama_status, id_user], (err, result) => {
    if (err) {
      console.error('Error creating status: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json({ message: 'Status created successfully', id: result.insertId });
  });
});

// Method GET di /api/status
app.get('/status', (req, res) => {
    const sql = 'SELECT * FROM status';
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Method GET di /api/users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});

app.listen(8081, () => {
  console.log('App listening on port 8081!');
});
