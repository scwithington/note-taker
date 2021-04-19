const router = require('express').Router();
const uuid = require('uuid/v1');
const fs = require('fs');

// read JSON file
function getJSON() {
    let data = fs.readFileSync('db/db.json')
    let dataParse = JSON.parse(data);
    return dataParse;
}

// stringify JSON file
function writeJSON(notes) {
    let data = fs.writeFileSync('db/db.json', JSON.stringify(notes));
}

// get notes
router.get('/notes', (req, res) => {
    let notes = getJSON();
    console.log(notes);
    res.json(notes);
})

//Post a new note
router.post('/notes', (req, res) => {
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
router.delete('/notes/:id', (req, res) => {
    let getNotes = getJSON();
    const noteFilter = getNotes.filter(note => note.id !== req.params.id);
    writeJSON(noteFilter);
    res.json({ok: true});
})

module.exports = router;