const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const app = express();

app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// port created by heroku, otherwise port = 8000
const PORT = process.env.PORT || 8000;

// port listener
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})