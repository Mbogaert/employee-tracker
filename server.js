// mysql connections
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'NEW_password1',
    database: 'company.db'
});
connection.connect((err) => {
    if (err) throw err;
    console
})
const express = require('express');

const PORT = process.env.PORT || 3004;
const app = express();

// Express middlewear
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = new mysql.Database('./db/company.db', err => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected to the company database.');
});

// Default found not found - catch all
app.use((req, res) => {
    res.status(404).end();
});

// start the server after connecting to the database
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});