var express = require('express');
var router = express.Router();
var database = require('../database/init');
const multer  = require('multer')
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images')
	},
	filename: function (req, file, cb) {
		let ext = file.mimetype.split('/')[1];

		cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
	}
});
const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log(req.session);

  let getNotes = await database.getNotes();
  console.log('get notes', getNotes);

  res.render('index', {
	  notes: getNotes
  });
});

router.post('/', upload.single('image'), async function(req, res, next) {
  let insertNotes = await database.insertNotes(req.body.title, req.body.description, req.file.filename);

  console.log('upload file', req.file)
  console.log('upload body', req.body);
  console.log(insertNotes);

  return res.redirect('/');
})

router.get('/about', function(req, res, next) {
  res.render('about', {});
});

module.exports = router;
