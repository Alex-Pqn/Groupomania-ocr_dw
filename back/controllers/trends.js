const mysql = require('mysql')

// mysql db
const dbConfig = require('../db_config')
const db = mysql.createPool(dbConfig.params)

exports.getAllForums = (req, res, next) => {
    db.query(
        `SELECT a.firstname,
                a.lastname,
                a.pic_url,
                f.text,
                f.created_at
        FROM Accounts as a
        INNER JOIN Forums as f
        ON a.id = f.user_id
        ORDER BY f.created_at DESC
        LIMIT 5`, (err, result) => {
        if(err) {
            return res.status(400).json({ sub_err: "La récupération du fil d'actualité personnel a échouée, veuillez réessayer dans quelques instants.", err })
        }
        // if user doesn't have custom icon, replace by vanilla icon
        result.forEach(userForum => {
            if(!userForum.pic_url) {
                userForum.pic_url = "http://localhost:3000/images/user-icon.png"
            }
        });
        
        return res.status(200).json({ result })
    })
}