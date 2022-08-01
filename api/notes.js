const notes = require('express').Router();
const fs = require('fs');

//  /api/notes
notes.get('/', (req, res) => {
   fs.readFile('db/db.json', 'utf-8', (err, data) => {
    err ? console.error(err) : res.json(JSON.parse(data));
   });
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    
    const newNote = {
        title,
        text
    }

    const noteData = fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if (err) console.error(err); 
        return JSON.parse(data);
    });

    noteData.push(newNote);
    
    res.json();
});

notes.delete('/:id', (req, res) => {
    res.json();
});

module.exports = notes;