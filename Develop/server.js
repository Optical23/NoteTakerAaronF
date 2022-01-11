const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const { response } = require('express');
const uuid = require('uuid');

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
  // for(let i = 0; i < db.length; i++){
  //   let notes = [];
  //   notes.push(db[i]);
  // }
  for (let i = 0; i < db.length; i++) {
    const element = array[i];
    
    
  }
  res.json(db[0]);
});

app.post('/api/notes', (req, res) => {
  
  const { title, text } = req.body;
  if (title && text){
    const newNote = {
      title,
      text,
      note_id: uuid(),
    }
  

  const noteString = JSON.stringify(newNote);

  fs.writeFile(`./db/db.json`, noteString, (err) => {
    err ? console.error(err) : console.log(`Review for ${newNote.product} has been posted`);
  })

  const response = {
    status: 'success',
    body: newNote,
  };

  console.log(response);
  res.json(response);
  }else {
    res.json('Error in posting.');
  }
});

// app.post('/notes')

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);