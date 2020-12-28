const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// routes
const commentsRoute = require('./routes/comments');
const forumsRoute = require('./routes/forums')
const userRoute = require('./routes/user');

// initialize express in app
const app = express();

// headers, methods & authorizations
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

// parser
app.use(bodyParser.json());

// api routes
app.use('/api/user', userRoute);
app.use('/api/forums', forumsRoute);
app.use('/api/comments', commentsRoute);

module.exports = app;