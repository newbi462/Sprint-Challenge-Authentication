/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');

const myMidWare = require('./secret.js');


module.exports = (req, res, next) => {
  //res.status(401).json({ you: 'shall not pass!' });

  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, myMidWare.jwtSecret, (error, decodedToken) => {
      if(error) { // the token is not valid
        res.status(401).json({ you: "can't touch this!"})
      } else { //request.user = { house: decodedToken.house };
        next();
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!'})
  }
};
