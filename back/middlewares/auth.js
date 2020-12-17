const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //get bearer auth token in headers
    const JWTAuthToken = req.headers.authorization.split(' ')[2];
    
    //compare token with key
    const decodedToken = jwt.verify(JWTAuthToken, process.env.KEY_TOKEN_AUTH);

    const { userId } = decodedToken;

    //invalid JWT token
    if (req.body.userId && req.body.userId != userId) {
      throw 'User ID not available';
    }
    //valid token, call the next module 
    else {
      next();
    }
  } catch (err) {
    console.log(err)
    res.status(401).json({ sub_error:"Le token d'authentification est incorrect ou a expiré." || err });
  }
};
