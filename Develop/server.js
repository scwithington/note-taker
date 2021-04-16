const path = require('path');
const express = require('express');
const uuid = require('uuid/v1');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use(express.static('public'));

// get notes
app.get('/api/notes', (req, res) => {
    let notes = getJSON();
    console.log(notes);
    res.json(notes);
})

function getJSON() {
    let data = fs.readFileSync('./db/db.json')
    let dataParse = JSON.parse(data);
    return dataParse;
}

function writeJSON(notes) {
    let data = fs.writeFileSync('./db/db.json', JSON.stringify(notes));
}

//Post a new note
app.post('/api/notes', (req, res) => {
    var notes = getJSON();
    console.log(req.body)
    const postNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid()
    };
    if (!postNote.title) {
        res.status(400).json({ message: 'Your note must have a title.' });
    } else if (!postNote.text) {
        res.status(400).json({ message: 'Your note must have a body.' });
    }

    notes.push(postNote);
    writeJSON(notes);
    res.json(postNote);
})

//Delete note
app.delete('/api/notes/:id', (req, res) => {
    let getNotes = getJSON();
    const noteFilter = getNotes.filter(note => note.id !== req.params.id);
    writeJSON(noteFilter);
    res.json({ok: true});
})


// joins file with index.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname + '/public/notes.html')));
app.get('*', (req, res) => {
    console.log('*');
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

// port created by heroku, otherwise port = 8000
const PORT = process.env.PORT || 8000;

// port listener
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

