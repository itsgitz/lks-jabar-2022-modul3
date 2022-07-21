var express = require('express');
var router = express.Router();
var database = require('../database/init');

router.get('/login', function(req, res, next) { 
  console.log('session message:', req.session.message);
  let message;
  if (!req.session.message) {
	  message = '';
  } else {
	  message = req.session.message
  }
  res.render('auth/login', {
    formTitle: 'Sign in',
    formUrl: req.originalUrl,
    message: message
  });
});

router.post('/login', async function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  const buff = new Buffer.from(password);
  const encodedPassword = buff.toString('base64');

  let user = await database.getUserByUsername(username, encodedPassword)
  console.log(user)

  if (!user) {
	  req.session.message = 'Username atau password yang anda masukan salah'
	  return res.redirect('/auth/login');
  } 

  req.session.login = true;
  req.session.username = username;

  req.session.message = '';

  return res.redirect('/');
});

router.get('/register', function(req, res, next) {
  console.log('session message:', req.session.message);
  let message;
  if (!req.session.message) {
    message = '';
  } else {
    message = req.session.message
  }

  res.render('auth/register', {
    formTitle: 'Sign up / Register account',
    formUrl: req.originalUrl,
    message: message
  });
});

router.post('/register', async function (req, res, next) {
  let buff = new Buffer.from(req.body.password);
  let password = buff.toString('base64');

  let user = await database.getUserByUsername(req.body.username, password)
  console.log(user)

  if (user) {
    req.session.message = 'Username already exist';
    return res.redirect('/auth/register');
  }

  let insertUser = await database.insertUser(req.body.username, password);

  console.log('insert user', insertUser)

  req.session.login = true;
  req.session.username = req.body.username;
  req.session.message = '';

  return res.redirect('/');
})

router.get('/logout', function(req, res, next) {
  req.session.destroy(err => {
    if (err) {
      return console.error(err);
    }

    return res.redirect('/auth/login');
  });
})

module.exports = router;
