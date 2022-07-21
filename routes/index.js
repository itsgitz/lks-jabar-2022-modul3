var express = require('express');
var router = express.Router();
var database = require('../database/init');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  // database.getNotes(function(data) {
  // });

  res.render('index', {});
});

router.get('/about', function(req, res, next) {
  res.render('about', {});
});

module.exports = router;
