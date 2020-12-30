const fs = require('fs')
const mysql = require('mysql')

// mysql db
const dbConfig = require('../db_config')
const db = mysql.createPool(dbConfig.params)

exports.getAllForums = (req, res, next) => {
    
}

exports.createOneForum = (req, res, next) => {
    let forum_text = JSON.parse(req.body.forum).text
    let user_id = JSON.parse(req.body.user).id
    let forum_image_url
    let dbQuery
    
    if (req.file) {
        forum_image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        dbQuery = `INSERT INTO Forums (user_id, text, image_url) VALUES (${user_id}, '${forum_text}', '${forum_image_url}')`
    }else{
        dbQuery = `INSERT INTO Forums (user_id, text) VALUES (${user_id}, '${forum_text}')`
    }
    
    db.query(dbQuery, (err, result) => {
        // error handler
        if(err) {
            fs.unlink(`images/${forum_image_url.split('/images/')[1]}`, (err => {
                if(err) {
                    res.status(500).json({ err })
                }
            }))
        }
        // forum created
        return res.status(200).json({
          message: `Le forum a été créé avec succès !`,
        })
    })
}