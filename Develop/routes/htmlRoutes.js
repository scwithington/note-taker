const path = require('path');
const router = require('express').Router();

// joins file with index.html
router.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../public/notes.html')));
router.get('*', (req, res) => {
    console.log('*');
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

module.exports = router;