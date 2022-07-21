var express = require('express');
var router = express.Router();
var database = require('../database/init');

router.get('/login', function(req, res, next) { 
  res.render('auth/login', {
    formTitle: 'Sign in',
    formUrl: req.originalUrl,
  });
});

router.post('/login', function(req, res, next) {
  //database.getUserByUsername(req.body.username);
  const username = req.body.username;
  const password = req.body.password;

  const buff = new Buffer.from(req.body.password);
  const encodedPassword = buff.toString('base64');

  req.session.login = true;
  req.session.username = username;

  return res.redirect('/');
});

router.get('/register', function(req, res, next) {
  res.render('auth/register', {
    formTitle: 'Sign up',
    formUrl: req.originalUrl
  });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(err => {
    if (err) {
      return console.error(err);
    }

    return res.redirect('/auth/login');
  });
})

module.exports = router;
