const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/***** CREATE NEW USER *****/
router.post('/register', (req, res) => {

    User.create({
      email: req.body.user.email,
      password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then (
      function createSuccess(user) {
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
        res.status(200).json({
          user: user,
          message: 'Welcome!',
          sessionToken: token
        })
      }
       
    )
    .catch(err => res.status(500).json({error: err}))
});

/******* USER LOGIN *******/
router.post('/login', (req, res) => {
    User.findOne({where: {email: req.body.user.email}})
    .then(function loginSuccess(user){
        if (user){
            bcrypt.compare(
                req.body.user.password,
                user.password,
                (err, matches) => {
                    if (matches) {
                        let token = jwt.sign({id: user.id},
                        process.env.JWT_SECRET, {
                            expiresIn: 60 * 60 * 24, 
                        });
                    res.status(200).json({
                        user: user,
                        message: 'Welcome back!',
                        sessionToken: token,
                    });
                    } else {
                        res.status(502).send({error: 'Login failed, try again?'}) //incorrect login password.
                    }
                }
            );
        } else {
            res.status(500).json({error: 'User does not exist.'});
        }
    })
    .catch((err) => res.status(500).json({error: err}));
});

module.exports = router;