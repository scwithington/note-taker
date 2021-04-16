const path = require('path');
const express = require('express');
var db = require('./db/db.json');
const uuid = require('uuid');
const fs = require('fs');

const app = express();

var root = {root: '/Develop/public' + __dirname }

app.use(bodyParser.urlencoded({ extend: false }));
app.use(express.json);
app.use(express.static(path.join(__dirname, '/Develop/public')));
app.get('/', (req, res) => res.sendFile('index.html'));
app.get('/notes', (req, res) => res.sendFile('notes.html'));

// app.get('./public/notes.html', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Develop'))
// })

// get notes
app.get('/api/notes', (req, res) => {
    const getNote = db.some((note) => {
        note.id == parseInt(req.params.id)
    });
    let json = getJSON();
    console.log(json);
    res.parse(json);
})

function getJSON() {
    var data = fs.readFileSync(__dirname + './db/db.json')
    var dataParse = JSON.parse(data);
    return dataParse;
}

//Post a new note
app.post('./api/notes', (req, res) => {
    console.log(req.body)
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