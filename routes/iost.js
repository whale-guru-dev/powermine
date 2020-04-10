var express = require('express');
var router = express.Router();
var iost = require('../iost/api')

/* GET IOST. */
router.get('/', function (req, res, next) {
    res.send('IOST is up');
});

/* GET CIRCULATION */
router.get('/circulation', function (req, res, next) {
    iost.grab_pmine_balance()
        .then(result => res.send(result))
        .catch(e => res.send(e))
});

/* GET RICHLIST */
router.get('/richlist', function (req, res, next) {
    iost.grab_pmine_accounts()
        .then(result => res.send(result))
        .catch(e => res.send(e))
});

router.get('/getPminePrice', function(req,res,next) {
    iost.getPminePrice()
        .then(result => res.send(result))
        .catch(e => res.send(e))
});

router.get('/getIOSTInContract', function(req,res,next) {
    iost.getIOSTInContract()
        .then(result => res.send(result))
        .catch(e => res.send(e))
});

router.get('/getCMCPrices', function(req,res, next) {
    iost.getCMCPrices()
        .then(result => res.send(result))
        .catch(e => res.send(e))
});

module.exports = router;
