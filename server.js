const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movie-db');


// const express = require('express');
// const app = express();
//
// app.get('/hello', (req, res) =>
//   res.send('Hello World!'));

require('./movies/service')(app);

const PORT = 4000;
app.listen(PORT);
