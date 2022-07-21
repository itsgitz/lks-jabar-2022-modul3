var express = require('express');
var router = express.Router();
var database = require('../database/init');

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log(req.session);

  let getNotes = await database.getNotes();

  res.render('index', {
	  notes: getNotes
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {});
});

module.exports = router;
