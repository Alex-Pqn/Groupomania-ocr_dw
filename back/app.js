const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// routes
const commentsRoute = require('./routes/comments')
const forumsRoute = require('./routes/forums')
const trendsRoute = require('./routes/trends')
const userRoute = require('./routes/user')

// db
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MySQL data base connected with success!'))
.catch(() => console.log('MySQL data base connection failed.'))

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
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoute);
app.use('/api/forums', forumsRoute);
app.use('/api/comments', commentsRoute);
app.use('/api/trends', trendsRoute);

module.exports = app;