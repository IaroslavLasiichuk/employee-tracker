// Node moduls
const express = require('express');
const app = express();
const { init } = require('./app/app');

//  Port number for Heroku
const PORT = process.env.PORT || 8000;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Initialize app
init();

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} at http://localhost${PORT}`);
})