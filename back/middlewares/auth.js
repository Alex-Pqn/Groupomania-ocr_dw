const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    let userIdHeader = req.headers.userid

    //get bearer auth token in headers
    const JWTAuthToken = req.headers.authorization.split(' ')[2];
    
    //compare token with key
    const decodedToken = jwt.verify(JWTAuthToken, process.env.KEY_TOKEN_AUTH);

    const { userId } = decodedToken;

    //invalid JWT token
    if (userIdHeader && userIdHeader != userId) {
      throw "Le token d'authentification est incorrect ou a expiré.";
    }
    //valid token, call the next module 
    else {
      next();
    }
  } catch (err) {
    res.status(401).json({ sub_err:"Le token d'authentification est incorrect ou a expiré.", err });
  }
};
