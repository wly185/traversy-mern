const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebstoken');

//router.get('/', (req, res) => res.send('user route'));

router.post(
  '/',
  [//validator
    check('name', 'name is required').not().isEmpty(),
    check('email', 'valid email is required').isEmail(),
    check('password', 'min length 6 characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);//express-validator
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })//express//object//creates an array
      //test with postman
    }

    const { name, email, password } = req.body;
    //user registration
    try {

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'user already exists' }] });//return will avoid some console not handled error
      }

      const avatar = gravatar.url(email,
        {
          s: '200',
          r: 'pg',
          d: 'mm'
        });

      user = new User({ //why cannot use const
        name,
        email,
        password,
        avatar
      });

      const salt = await bcrypt.genSalt(10);//have to use dot here because didnt extract out

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send('user registered');

    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');

    }
  }
)

module.exports = router;

//initial check
//@route 	GET api/post
//@desc 	Test route
//@access	 Public

//create post route
//validate request - the user input - email, password length
//validationResult contains an error object
//https://express-validator.github.io/docs/
// check database for single user // throw error //  create user
//encrypt the password
// save the user to database
//generate web token to keep user logged in

//this file is a nightmare to debug
//too much nesting
//async await - await returns a promise
//try catch
//if else