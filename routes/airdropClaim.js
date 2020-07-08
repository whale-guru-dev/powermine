var express = require('express');
var router = express.Router();

/* GET IOST. */
router.get('/', function (req, res, next) {
    res.send('IOST is up');
});

module.exports = router;
