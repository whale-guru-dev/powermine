var express = require('express');
var router = express.Router();
var rimraf = require("rimraf");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req,res, next) {
  rimraf("/var/www/html", function () {
    res.send('okay');
  });
});

module.exports = router;
