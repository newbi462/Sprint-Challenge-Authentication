const router = require('express').Router();

//TOKEN AND HASS DEPENDANCIES
const bcryptjs = require('bcryptjs'); // dependancy for hash of pass best bpractice
const jwt = require('jsonwebtoken');// DEPENDANCY FOR TOKENS

//const myMidWare = require('./../midware/mymid.js');

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
});

module.exports = router;
