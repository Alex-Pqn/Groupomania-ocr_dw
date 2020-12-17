const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const bcryptSaltRounds = 10

// mysql db
const dbConfig = require('../db_config')
const db = mysql.createPool(dbConfig.params)

//register
exports.register = (req, res, next) => {
  // hash password with bcrypt
  bcrypt.hash(req.body.password, bcryptSaltRounds)
    .then(function(hashed_password) {
      // insert in db the new account
      db.query(
        `INSERT INTO Accounts (firstname, lastname, email, hashed_password, newsletters) VALUES ('${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${hashed_password}', ${req.body.newsletters});`, 
        (err) => {
        // error handler
        if(err) {
          // account with this e-mail already exists
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(401).json({ sub_error: "Il semblerait qu'un compte possédant cet e-mail existe déjà.", err })
          }else {
            return res.status(401).json({ sub_error: "La création de votre compte a échoué, veuillez réessayer dans quelques instants.", err })
          }
        }
        // search the new created account (for get user id to return in front)
        db.query(
          `SELECT * FROM Accounts WHERE email LIKE '${req.body.email}'`, 
          (err, result) => {
          let userDb = result[0]
          
          // error handler
          if(err) {
            return res.status(401).json({ sub_error: "La création de votre compte a échoué, veuillez réessayer dans quelques instants.", err })
          }
          // account created with success
          return res.status(200).json({ 
            message: `Nous te souhaitons la bienvenue ${req.body.firstname} !`,
            userId: userDb.id,
            token: jwt.sign(
              { userId: userDb.id },
              process.env.KEY_TOKEN_AUTH,
              { expiresIn: "24h" }
            )
          })
        })
      })
    })
    .catch((err) => res.status(500).json({ err }))
}
  
//login
exports.login = (req, res, next) => {
  // search a row in db with this e-mail
  db.query(`SELECT * FROM Accounts WHERE email LIKE '${req.body.email}'`, 
  (err, result) => {
    let userDb = result[0]
    
    // error handler
    if(err) {
      return res.status(401).json({ sub_error: "La tentative d'authentification a échoué, veuillez réessayer dans quelques instants.", err })
    }
    // no one account finded
    if(result.length === 0) {
      return res.status(401).json({ sub_error: "L'e-mail et le mot de passe entré sont incorrects.", err })
    // account finded 
    }else{
      // compare passwords
      bcrypt.compare(req.body.password, userDb.hashed_password)
        .then(function(bcryptResult) {
          // passwords don't matchs
          if(!bcryptResult) {
            res.status(401).json({ sub_error: "L'e-mail et le mot de passe entré sont incorrects." })
          // passwords matchs
          }else{
            return res.status(200).json({ 
              message: `Connexion réussie, bon retour parmi nous ${userDb.firstname} !`,
              userId: userDb.id,
              token: jwt.sign(
                { userId: userDb.id },
                process.env.KEY_TOKEN_AUTH,
                { expiresIn: "24h" }
              )
            })
          }
        })
        .catch(err => res.status(500).json({ sub_error: "La tentative d'authentification a échoué, veuillez réessayer dans quelques instants.", err }))
      }
    }
  )
}
  
exports.getParameters = (req, res, next) => {
  
}

exports.updateParameters = (req, res, next) => {
  
}