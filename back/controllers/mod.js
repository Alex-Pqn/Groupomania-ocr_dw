const fs = require('fs')
const mysql = require('mysql')

// mysql db
const dbConfig = require('../db_config')
const db = mysql.createPool(dbConfig.params)

exports.deleteOneComment = (req, res, next) => {
    let commentId = req.body.id
    
    // required fields
    if(commentId) {
        // delete comment
        db.query(`DELETE FROM Comments WHERE id=${ commentId }`, (err, result) => {
            // error handler
            if(err) {
            return res.status(400).json({ sub_err: "La suppression du commentaire a échoué, veuillez réessayer dans quelques instants.", err })
            }
            // comment deleted
            return res.status(200).json({
            message: `Le commentaire a été correctement supprimé.`,
            })
        })    
    }
    // fields missing
    else{
        return res.status(400).json({ sub_err: "Validation de donnée: Il semblerait que l'un des champs requis est manquant." })
    }
}

exports.deleteOneForum = (req, res, next) => {
    let forumId = req.body.id
    
    // required fields
    if(forumId) {
        db.query(`SELECT * FROM Comments WHERE forum_id=${ forumId }`, (err, result) => {
            // error handler
            if(err) {
                return res.status(400).json({ sub_err: "La récupération des commentaires à supprimer a échouée, veuillez réessayer dans quelques instants.", err })
            }
            if(result.length !== 0) {
                db.query(`DELETE FROM Comments WHERE forum_id=${ forumId }`, (err, result) => {
                    // error handler
                    if(err) {
                        return res.status(400).json({ sub_err: "La suppression des commentaires a échouée, veuillez réessayer dans quelques instants.", err })
                    }
                })  
            }
            db.query(`SELECT * FROM Forums WHERE id=${ forumId }`, (err, result) => {
                // error handler
                if(err) {
                    return res.status(400).json({ sub_err: "La récupération du forum à supprimer a échouée, veuillez réessayer dans quelques instants.", err })
                }
                
                let forumImageUrl = result[0].image_url
                if(forumImageUrl) {
                    fs.unlink(`images/${forumImageUrl.split('/images/')[1]}`, (err => {
                        if(err) {
                            return res.status(500).json({ err })
                        }
                    }))
                }
                
                // delete forum
                db.query(`DELETE FROM Forums WHERE id=${ forumId }`, (err, result) => {
                    // error handler
                    if(err) {
                        return res.status(400).json({ sub_err: "La suppression du forum a échoué, veuillez réessayer dans quelques instants.", err })
                    }
                    // forum deleted
                    return res.status(200).json({
                        message: `Le forum a été correctement supprimé.`,
                    })
                })   
            }) 
        })  
    }
    // fields missing
    else{
        return res.status(400).json({ sub_err: "Validation de donnée: Il semblerait que l'un des champs requis est manquant." })
    }
}