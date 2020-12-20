const User = require('../models/User')

module.exports = (req, res, next) => {
  let dataValidation
    
  if(req.body.firstname && req.body.lastname && req.body.email && req.body.password && req.body.newsletters || req.body.email && req.body.password) {
    dataValidation = User.validate(req.body)
  }else{
    return res.status(400).json({ sub_error: "La validation des données a échoué, veuillez réessayer." })
  }
    
  // error handler
  if(dataValidation.error) {
    let err = {
      message: dataValidation.error.details[0].message,
      code: dataValidation.error.details[0].type
  }
  return res.status(400).json({ sub_error: "La validation des données a échoué, veuillez réessayer.", err })
  // success
  }else{
      next()
  }
}