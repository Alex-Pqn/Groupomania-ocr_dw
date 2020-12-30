const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const bcryptSaltRounds = 10

// model
const User = require('../models/User')

// mysql db
const dbConfig = require('../db_config')
const db = mysql.createPool(dbConfig.params)

// page requires auth : return status 200 after validation token by auth middleware
exports.pageAuth = (req, res, next) => {
  res.status(200)
}

//register
exports.register = (req, res, next) => {
  // required fields
  if(req.body.firstname && req.body.lastname && req.body.email && req.body.password && req.body.newsletters) {
    // data validation
    let dataValidation
    dataValidation = User.validate(req.body)
    
    // data validation failed
    if(dataValidation.error) {
      let dataValidationError = {
        message: dataValidation.error.details[0].message,
        code: dataValidation.error.details[0].type
      }
      return res.status(400).json({ sub_error: "Validation de donnée: Il semblerait que l'un des champs requis est incorrect.", err: dataValidationError })
    }
    // data validation success
    else{
      // hash password with bcrypt
      bcrypt.hash(req.body.password, bcryptSaltRounds)
        .then(function(hashed_password) {
          // insert in db the new account
          db.query(
            `INSERT INTO Accounts (firstname, lastname, email, hashed_password, newsletters) VALUES ('${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${hashed_password}', ${req.body.newsletters});`, 
            (err, result) => {
            let userDb = result
            
            // error handler
            if(err) {
              // duplicated entry code (account with this e-mail already exist)
              if (err.errno === 1062) {
                return res.status(401).json({ sub_error: "Il semblerait qu'un compte possédant cet e-mail est déjà existant.", err })
              }
              // other
              else {
                return res.status(401).json({ sub_error: "La création de votre compte a échoué, veuillez réessayer dans quelques instants.", err })
              }
            }
            // account created
            return res.status(200).json({ 
              message: `Nous te souhaitons la bienvenue ${req.body.firstname} !`,
              userId: userDb.insertId,
              token: jwt.sign(
                { userId: userDb.insertId },
                process.env.KEY_TOKEN_AUTH,
                { expiresIn: "24h" }
              )
            })
          })
        })
        // bcrypt.compare() failed
        .catch((err) => res.status(500).json({ sub_error: "La création de votre compte a échoué, veuillez réessayer dans quelques instants.", err })) 
    }
  }
  // fields missing
  else{
    return res.status(400).json({ sub_error: "Validation de donnée: Il semblerait que l'un des champs requis est manquant." })
  }
}
 
//login
exports.login = (req, res, next) => {
  // required fields
  if(req.body.email && req.body.password) {
    // data validation
    let dataValidation
    dataValidation = User.validate(req.body)
    
    // data validation failed
    if(dataValidation.error) {
      let dataValidationError = {
        message: dataValidation.error.details[0].message,
        code: dataValidation.error.details[0].type
      }
      return res.status(400).json({ sub_error: "Validation de donnée: Il semblerait que l'un des champs requis est manquant ou incorrect.", err: dataValidationError })
    }
    // validation success
    else{
      // search a row in db with this e-mail
      db.query(
        `SELECT * FROM Accounts WHERE email LIKE '${req.body.email}'`, 
        (err, result) => {
        let userDb = result[0]
        
        // error handler
        if(err) {
          return res.status(401).json({ sub_error: "La tentative d'authentification a échoué, veuillez réessayer dans quelques instants.", err })
        }
        // no one account finded
        if(result.length === 0) {
          return res.status(401).json({ sub_error: "L'e-mail et le mot de passe entré sont incorrects.", err })
        }
        // account finded 
        else{
          // compare passwords
          bcrypt.compare(req.body.password, userDb.hashed_password)
            .then(function(bcryptResult) {
              // passwords don't matchs
              if(!bcryptResult) {
                res.status(401).json({ sub_error: "L'e-mail et le mot de passe entré sont incorrects." })

              }
              // passwords matchs
              else{
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
            // bcrypt.compare() failed
            .catch(err => res.status(500).json({ sub_error: "La tentative d'authentification a échoué, veuillez réessayer dans quelques instants.", err }))
          }
        }
      ) 
    }
  }
  // fields missing
  else{
    return res.status(400).json({ sub_error: "Validation de donnée: Il semblerait que l'un des champs requis est manquant." })
  }
}
  
exports.getParameters = (req, res, next) => {
  
}

exports.updateParameters = (req, res, next) => {
  
}