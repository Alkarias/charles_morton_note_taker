const express = require('express');

const notes = require('./notes');

const app = express();

// /api/notes
app.use('/notes', notes);

module.exports = app;