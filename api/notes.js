const notes = require('express').Router();
const { resolveSoa } = require('dns');
const { json } = require('express');
const fs = require('fs');


//tell the application where the information is saved
const fileName = 'db/db.json';


//  /api/notes
// get all of the saved notes
notes.get('/', async (req, res) => {
    try {
        fs.readFile(fileName, 'utf-8', (err, data) => {
            err ? console.error(err) : res.json(JSON.parse(data));
        });
    } catch (err) {
        res.json(err);
    }
});

notes.post('/', async (req, res) => {
    try {
        const { title, text } = req.body;

        fs.readFile(fileName, 'utf-8', (err, data) => {
            data = JSON.parse(data);
            console.log(typeof data, data);
            // generate a new id 
            let id;
            if (data.length === 0) id = 1;
            else id = data[data.length-1].id + 1;
            // create a new note and add it to the array
            const newNote = {
                id: id,
                title: title,
                text: text
            }
            data.push(newNote);
            // write the appended information to a json file
            fs.writeFile(fileName, JSON.stringify(data), err => {
                err ? res.status(500).json(err) : res.status(200).json(data);
            })
        });
    } catch (err) {
        res.json(err);
    }
});

notes.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // get the saved information from the file
        fs.readFile(fileName, 'utf-8', (err, data) => {
            data = JSON.parse(data);
            // get the index of the note with the requested id
            let index = 0;
            data.forEach(note => {
                if (note.id == id) return index;
                index++;
            });
            // remove the note from the saved information
            data.splice(index-1, 1);
            // write the updated information to the new file
            fs.writeFile(fileName, JSON.stringify(data), err => {
                err ? res.status(500).json(err) : res.status(200).json(data);
            })
        });
    } catch(err) {
        res.json(err);
    }
});

module.exports = notes;