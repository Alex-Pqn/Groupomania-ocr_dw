const fs = require('fs')
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
  res.status(200).json({ message: "Valid token, authentication success." })
}

//register
exports.register = (req, res, next) => {
  let user = req.body
  let firstname = user.firstname
  let lastname = user.lastname
  let email = user.email
  let password = user.password
  let newsletters = user.newsletters
  
  // required fields
  if(firstname && lastname && email && password && newsletters) {
    // data validation
    let dataValidation
    dataValidation = User.validate(user)
    
    // data validation error
    if(dataValidation.error) {
      let dataValidationError = {
        message: dataValidation.error.details[0].message,
        code: dataValidation.error.details[0].type
      }
      return res.status(400).json({ sub_err: "Validation de donnée: Il semblerait que l'un des champs requis est incorrect.", err: dataValidationError })
    }
    // data validation success
    else{
      // hash password with bcrypt
      bcrypt.hash(password, bcryptSaltRounds)
        // hash password success
        .then(function(hashed_password) {
          // insert in db the new account
          db.query(
            `INSERT INTO Accounts (firstname, lastname, email, hashed_password, newsletters) VALUES ('${ firstname }', '${ lastname }', '${ email }', '${ hashed_password }', ${ newsletters });`, 
            (err, result) => {
            let userDb = result
            
            // error handler
            if(err) {
              // duplicated entry code
              if (err.errno === 1062) {
                return res.status(400).json({ sub_err: "Il semblerait qu'un compte possédant cet e-mail est déjà existant.", err })
              }
              // other
              else {
                return res.status(400).json({ sub_err: "La création de votre compte a échoué, veuillez réessayer dans quelques instants.", err })
              }
            }
            // account created
            return res.status(200).json({ 
              message: `Nous te souhaitons la bienvenue ${ firstname } !`,
              userId: userDb.insertId,
              token: jwt.sign(
                { userId: userDb.insertId },
                process.env.KEY_TOKEN_AUTH,
                { expiresIn: "24h" }
              )
            })
          })
        })
        // hash password failed
        .catch((err) => res.status(500).json({ sub_err: "La création de votre compte a échoué, veuillez réessayer dans quelques instants.", err })) 
    }
  }
  // fields missing
  else{
    return res.status(400).json({ sub_err: "Validation de donnée: Il semblerait que l'un des champs requis est manquant." })
  }
}
 
//login
exports.login = (req, res, next) => {
  let email = req.body.email
  let password = req.body.password
  
  // required fields
  if(email && password) {
    // data validation
    let dataValidation
    dataValidation = User.validate(req.body)
    
    // data validation failed
    if(dataValidation.error) {
      let dataValidationError = {
        message: dataValidation.error.details[0].message,
        code: dataValidation.error.details[0].type
      }
      return res.status(400).json({ sub_err: "Validation de donnée: Il semblerait que l'un des champs requis est manquant ou incorrect.", err: dataValidationError })
    }
    // data validation success
    else{
      // search a row in db with this e-mail
      db.query(
        `SELECT * FROM Accounts WHERE email LIKE '${email}'`, 
        (err, result) => {
        let userDb = result[0]
        
        // error handler
        if(err) {
          return res.status(400).json({ sub_err: "La tentative d'authentification a échoué, veuillez réessayer dans quelques instants.", err })
        }
        // no one account finded
        if(result.length === 0) {
          return res.status(401).json({ sub_err: "L'e-mail et le mot de passe entré sont incorrects.", err })
        }
        
        // account finded 
        else{
          // compare passwords
          bcrypt.compare(password, userDb.hashed_password)
            .then(function(bcryptResult) {
              // passwords don't matchs
              if(!bcryptResult) {
                return res.status(401).json({ sub_err: "L'e-mail et le mot de passe entré sont incorrects." })

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
            .catch(err => res.status(500).json({ sub_err: "La tentative d'authentification a échoué, veuillez réessayer dans quelques instants.", err }))
          }
        }
      ) 
    }
  }
  // fields missing
  else{
    return res.status(400).json({ sub_err: "Validation de donnée: Il semblerait que l'un des champs requis est manquant." })
  }
}

exports.getPrimaryInfos = (req, res, next) => {
  let userId = req.headers.userid
  
  // required fields
  if(userId) {
    // get primary user informations
    db.query(
      `SELECT pic_url,
              firstname,
              lastname,
              description,
              is_mod,
              is_admin
      FROM Accounts
      WHERE id = ${userId}`, 
      (err, result) => {
        
      // error handler
      if(err) {
        return res.status(400).json({ sub_err: "La récupération des données de l'utilisateur a échouée, veuillez réessayer dans quelques instants.", err })
      }
      
      // if user doesn't have custom icon, replace by vanilla icon
      result.forEach(userAccount => {
        if(!userAccount.pic_url) {
          userAccount.pic_url = "http://localhost:3000/images/user-icon.png"
        }
      });
      
      // account created
      return res.status(200).json({ result })
    })
  }
  // fields missing
  else{
    return res.status(400).json({ sub_err: "Validation de donnée: Il semblerait que l'un des champs requis est manquant." })
  }
}
  
exports.getParameters = (req, res, next) => {
  let userId = req.headers.userid
  
  // required fields
  if(userId) {
    // get user parameters
    db.query(
      `SELECT pic_url,
              firstname,
              lastname,
              description,
              email,
              newsletters,
              is_mod,
              is_admin
      FROM Accounts
      WHERE id = ${userId}`, 
      (err, result) => {
        
      // error handler
      if(err) {
        return res.status(400).json({ sub_err: "La récupération des paramètres de l'utilisateur a échouée, veuillez réessayer dans quelques instants.", err })
      }
      
      // if user doesn't have custom icon, replace by vanilla icon
      result.forEach(userAccount => {
        if(!userAccount.pic_url) {
          userAccount.pic_url = "http://localhost:3000/images/user-icon.png"
        }
      });
      
      // account created
      return res.status(200).json({ result })
    })
  }
  // fields missing
  else{
    return res.status(400).json({ sub_err: "Validation de donnée: Il semblerait que l'un des champs requis est manquant." })
  }
}

exports.updateParameters = (req, res, next) => {
  let userId = req.headers.userid
  let userParameters = JSON.parse(req.body.userParameters)
  let userPicWasUpdated = false
  
  let firstname = userParameters.firstname
  let lastname = userParameters.lastname
  let email = userParameters.email
  let password = userParameters.password
  let description = userParameters.description
  let newsletters = userParameters.newsletters
  let pic_url = userParameters.pic_url
  
  let dbQuery
  
  // required fields
  if(firstname && lastname && email && newsletters && pic_url && userId) {
    // data validation
    let dataValidation
    dataValidation = User.validate(userParameters)
    
    // data validation failed
    if(dataValidation.error) {
      let dataValidationError = {
        message: dataValidation.error.details[0].message,
        code: dataValidation.error.details[0].type
      }
      return res.status(400).json({ sub_err: "Validation de donnée: Il semblerait que l'un des champs requis est incorrect.", err: dataValidationError })
    }
    // data validation success
    else{
      // if file in request, remove older user pic url / pic_url = older user pic url
      if(req.file) {
        userPicWasUpdated = true
        if(pic_url != "http://localhost:3000/images/user-icon.png") {
          fs.unlink(`images/${pic_url.split('/images/')[1]}`, (err => {
            if(err) {
                return res.status(500).json({ err })
            }
          }))
        }
        // define new user pic url
        pic_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      }
      // if password in request, hash password with bcrypt
      if(password) {
        bcrypt.hash(password, bcryptSaltRounds)
        
        // hash password success
        .then(function (hashed_password) {
          dbQuery = `UPDATE Accounts SET pic_url="${ pic_url }", firstname="${ firstname }", lastname="${ lastname }", description="${ description }", email="${ email }", hashed_password="${ hashed_password }", newsletters=${ newsletters } WHERE id = ${ userId }`
          updateParameters()
        })
        
        // hash password failed
        .catch((err) => res.status(500).json({ sub_err: "La modification des paramètres utilisateur a échouée, veuillez réessayer dans quelques instants..", err })) 
      }
      // if there is not password in request
      else{
        dbQuery = `UPDATE Accounts SET pic_url="${ pic_url }", firstname="${ firstname }", lastname="${ lastname }", description="${ description }", email="${ email }", newsletters=${ newsletters } WHERE id = ${ userId }`
        updateParameters()
      }
      function updateParameters () {
        db.query(dbQuery, (err, result) => {
          // error handler
          if(err) {
            // unlink the new user pic
            if(req.file) {
              fs.unlink(`images/${pic_url.split('/images/')[1]}`, (err => {
                if(err) {
                    return res.status(500).json({ err })
                }
              }))
            }
            return res.status(400).json({ sub_err: "La modification des paramètres utilisateur a échouée, veuillez réessayer dans quelques instants..", err })
          }
          // forum created
          return res.status(200).json({
            message: `Les modifications ont été enregistrées.`, userPicWasUpdated
          })
        }) 
      } 
    }
  }  
  // fields missing
  else{
    fs.unlink(`images/${pic_url.split('/images/')[1]}`, (err => {
      if(err) {
          return res.status(500).json({ err })
      }
    }))
    return res.status(400).json({ sub_err: "Validation de donnée: Il semblerait que l'un des champs requis est manquant." })
  }
}

exports.deleteAccount = (req, res, next) => {
  let userId = req.headers.userid
  let userForumsList = []
  
  // required fields
  if(userId) {
    
    // get all forums created by user
    db.query(`SELECT * FROM Forums WHERE user_id=${ userId }`, (err, result) => {
      // error handler
      if(err) {
        return res.status(400).json({ sub_err: "La récupération de vos discussions et la suppression de votre compte a échouée, veuillez réessayer dans quelques instants.", err })
      }
      
      // push forums id in array and delete forum image
      result.forEach(forum => {
        userForumsList.push(forum.id)
        if(forum.image_url) {
          fs.unlink(`images/${forum.image_url.split('/images/')[1]}`, (err => {
            if(err) {
                return res.status(500).json({ err })
            }
          }))
        }
      })
      
    // delete comments posted by the user + comments posted below forums
    if(userForumsList.length >= 1) {
      dbQuery = `DELETE FROM Comments WHERE user_id=${ userId } or forum_id in (${ userForumsList })`
    }else{
      dbQuery = `DELETE FROM Comments WHERE user_id=${ userId }`
    }
    db.query(dbQuery, (err, result) => {
      // error handler
      if(err) {
        return res.status(400).json({ sub_err: "La suppression de vos commentaires et de votre compte a échouée, veuillez réessayer dans quelques instants.", err })
      }
      
      // delete forums posted by user
      db.query(`DELETE FROM Forums WHERE user_id=${ userId }`, (err, result) => {
        // error handler
        if(err) {
          return res.status(400).json({ sub_err: "La suppression de vos discussions et de votre compte a échouée, veuillez réessayer dans quelques instants.", err })
        }
          
        // delete user pic
        db.query(`SELECT * FROM Accounts WHERE id=${ userId }`, (err, result) => {
          // error handler
          if(err) {
            return res.status(400).json({ sub_err: "La suppression de votre photo de profil et de votre compte a échouée, veuillez réessayer dans quelques instants.", err })
          }
          
          let userPic = result[0].pic_url
          if(userPic && userPic != "http://localhost:3000/images/user-icon.png") {
            fs.unlink(`images/${userPic.split('/images/')[1]}`, (err => {
              if(err) {
                  return res.status(500).json({ err })
              }
            }))
          }
        
            // delete account of user
            db.query(`DELETE FROM Accounts WHERE id=${ userId }`, (err, result) => {
              // error handler
              if(err) {
                return res.status(400).json({ sub_err: "La suppression de votre compte a échouée, veuillez réessayer dans quelques instants.", err })
              }
              // account deleted
              return res.status(200).json({
                message: `Votre compte a été correctement supprimé.`,
              })
            }) 
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