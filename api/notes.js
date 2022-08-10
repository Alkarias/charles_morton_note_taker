const notes = require('express').Router();
const fs = require('fs');


//tell the application where the information is saved
const fileName = 'db/db.json';


//  /api/notes
// get all of the saved notes
notes.get('/', (req, res) => {
    try {
        fs.readFile(fileName, 'utf-8', (err, data) => {
            err ? console.error(err) : res.json(JSON.parse(data));
        });
    } catch (err) {
        res.json(err);
    }
});

notes.post('/', (req, res) => {
    // instantiate the information entered onto the page
    const { title, text } = req.body;
 
    //get the list of stored information
    fs.readFile(fileName, 'utf-8', (err, data) => {
        // if there is an error, console log it
        // otherwise, run the code to append the array of list items
        if (err) console.error(err); 
        else {
            // parses the information from the .json file and makes it usable
            const noteData = JSON.parse(data);
            // make a new note object that stores the information
            const newNote = {
                id: data.length,
                title,
                text
            }
            // adds the new note to the array of notes
            noteData.push(newNote);
            //writes the information to the json file
            fs.writeFile(fileName, JSON.stringify(noteData), err => console.error(err));
            res.json(noteData);
        }
    });
});

notes.delete('/:id', (req, res) => {
    console.log(req.params.id);
    res.json('all good');
});

module.exports = notes;