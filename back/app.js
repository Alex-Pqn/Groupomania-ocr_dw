const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
require('dotenv').config();

// routes
const commentsRoute = require('./routes/comments');
const homeRoute = require('./routes/home')
const profileRoute = require('./routes/profile')
const trendsRoute = require('./routes/trends')
const userRoute = require('./routes/user');
const modRoute = require('./routes/mod')

// initialize express in app
const app = express();

// headers, methods & authorizations
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, UserId, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

// api routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoute);
app.use('/api/home', homeRoute);
app.use('/api/profile', profileRoute);
app.use('/api/trends', trendsRoute);
app.use('/api/comments', commentsRoute);
app.use('/api/mod', modRoute);

module.exports = app;