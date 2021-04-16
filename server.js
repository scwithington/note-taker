const path = require('path');
const express = require('express');
var db = require('./db/db.json')
const uuid = require('uuid')

const app = express();

app.use(express.json);
app.use(express.static(path.join(__dirname, 'public')));

app.get('./public/notes.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop'))
})

// app.get('./api/notes/:id', (req, res) => {
    
// })

//Post a new note
app.post('./api/notes', (req, res) => {
    const postNote = {
        title: req.body.title,
        text: req.body.text
    };
    if (!postNote.title) {
        res.status(404).json({ message: 'Your note must have a title.' });
    } else if (!postNote.text) {
        res.status(404).json({ message: 'Your note must have a body.' });
    }

    db.push(postNote);
    res.json(db);
})

//Delete note





// joins file with index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/index.html'))
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})