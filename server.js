const path = require('path');
const express = require('express');


const app = express();

app.use(express.json);

app.get('./notes.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public'))
})



app.use(express.static(path.join(__dirname, 'public')));