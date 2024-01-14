const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password, firstName, lastName, gender, birthday } = req.body;
  User.register(new User({ username, firstName, lastName, gender, birthday }), password, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Registration failed.' });
    } else {
      passport.authenticate('local')(req, res, () => {
        res.json({ message: 'Registration successful.' });
      });
    }
  });
});



router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful.' });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful.' });
});

module.exports = router;
