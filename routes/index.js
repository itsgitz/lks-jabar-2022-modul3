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

router.post('/', async function(req, res, next) {
  let insertNotes = await database.insertNotes(req.body.title, req.body.description);

  console.log(insertNotes);

  return res.redirect('/');
})

router.get('/about', function(req, res, next) {
  res.render('about', {});
});

module.exports = router;
