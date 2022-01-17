const express = require('express');

const router = express.Router();

// Vadidation
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {User} = require('../models/user.model');

// @route       Post /users
// @description Register User
// @access      Public
router.post(
  '/',
  [
    check('name', 'Your name is required')
      .not()
      .isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({min: 6}),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
      let user = await User.findOne({email});
      // See if a user exists
      if (user) {
        res.status(400).json({error: [{msg: 'User already exists'}]});
      }

      // Create new user instance.
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 36000},
        (err, token) => {
          if (err) throw err;
          res.json({token});
        },
      );
    } catch (err) {
      res.status(500).send('Server Error');
    }
    return '';
  },
);

module.exports = router;
