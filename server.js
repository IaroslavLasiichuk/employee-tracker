// Node moduls
const { urlencoded, json } = require('express');
const express = require('express');
const mysql = require('mysql2');
const app = express();

//  Port number for Heroku
const PORT = process.env.PORT || 8000;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '2105895433Sl',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
)

app.get('/api/employee', (req, res) => {
    const sql = `SELECT id, first_name AS name FROM employee`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} at http://localhost${PORT}`);
})