var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.get('/powermine-whitepaper/', function(req, res, next) {
  res.render('whitepaper', { title: 'Express' });
});

module.exports = router;
