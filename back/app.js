const express = require('express');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// let sql = 'CREATE TABLE ......................'
// db.query(sql, (err, result) => {
//     if(err) throw err;
//     console.log(result)
// })

// routes
const commentsRoute = require('./routes/comments');
const forumsRoute = require('./routes/forums');
const userRoute = require('./routes/user');

// db
const db = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_USER_PASSWORD,
    database : process.env.MYSQL_DATABASE
    
})
db.connect(
    db.on('error', (err) => {
        console.error("MySQL database error: " + err)
    }),
    db.on('drain', () => {
        console.log('Mysql database connected...')
    })
);

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

module.exports = app;