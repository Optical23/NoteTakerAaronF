const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const { v4: uuid} = require('uuid');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const PORT = 3001;

//html response for root url for main(starter) page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
//html response for notes with /notes url
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))

    console.info(`${req.method} request received to get notes`);
});

///API responses
//get request for notes information from database
app.get('/api/notes', (req, res) => {
    res.json(db);
});

app.post('/api/notes', (req, res) => {
  
  // add id to req.body
  req.body.id = uuid();
  //pushes req to db array
  db.push(req.body);
  //function to save the new db array
  rewritedb(db);
  //response for the programmer to see if the data saved successfully
  const response = {
    status: 'success',
    body: req.body,
  };

  console.log(response);
  res.json(req.body);
  
});
//function to write the db.json with new note
var rewritedb = function(note) {
  note = JSON.stringify(note);
  fs.writeFileSync("./db/db.json", note, function(err){
   if (err) {
      return console.log(err);
    }
  });
}
//delete request
app.delete("/api/notes/:id", (req, res) => {
  //simple id comparing and delete from the array and resetting the db.json file
  let id = req.params.id.toString();
  for (let i = 0; i < db.length; i++) {
    if(db[i].id === id){
      res.send(db[i]);
      db.splice(i,1);
      break;
    }
  }
  rewritedb(db)
});
  

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);