const express = require('express');
const path = require('path');
const fs = require('fs');

const notes = require('./db/db.json');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))

    console.info(`${req.method} request received to get notes`);
});
app.get('/api/notes', (req, res) => {
    console.info(`${req.method + notes}`)
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);