const router = require('express').Router();

//TOKEN AND HASS DEPENDANCIES
const bcryptjs = require('bcryptjs'); // dependancy for hash of pass best bpractice
const jwt = require('jsonwebtoken');// DEPENDANCY FOR TOKENS

const myMidWare = require('./secret.js');
const isLoggedIn = require('./authenticate-middleware.js');

const UserModel = require('./userModel.js');



router.post('/register', (req, res) => {
  // implement registration
  let userObj = req.body;
  const hash = bcryptjs.hashSync(req.body.password, 8);// 2^8 hash
  userObj.password = hash;// based on what I called this in my table object

  UserModel.addUser(userObj)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  UserModel.findByProp({ username }).first()//first() assumes user is the first find
    .then(userObj => {
      if (userObj && bcryptjs.compareSync(password, userObj.password)) {
        const token = signToken(userObj); // <<<<<<<<<<<
        //responce.status(200).json({ token }); // <<<<<<<<<<
        res.status(200).json(
          {
            message: `Welcome ${userObj.username}!, you are Logged In`,
            tokenMeg: token
          }
        );
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

/* SANITY TEST OF AUTH WORKING*/
router.get('/users', isLoggedIn, (request, responce) => {
  UserModel.listUsers()
    .then(users => { responce.json(users); })
    .catch( error => {
      console.log(error);
      responce.status(500).json( {error: "Get USERS Failed."} )
    })
});
//AND COMENT OUT DUE TO REQ TO TEST ENDPOINTS*/

//TOKEN
function signToken(user) {
  const payload = {
    userid: user.id
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, myMidWare.jwtSecret, options);
}

module.exports = router;
