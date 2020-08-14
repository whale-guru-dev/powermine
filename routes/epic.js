var express = require('express');
var router = express.Router();
var epic = require('../epic/api');

/* GET IOST. */
router.get('/', function (req, res, next) {
    res.send('IOST is up');
});

/* GET CIRCULATION */
router.get('/circulation', function (req, res, next) {
    epic.grab_epic_balance()
        .then(result => {

            return res.send(JSON.parse(result).data)
        })
        .catch(e => res.send(e))
});

/* Get total staked    */
router.get('/totalStaked', function (req, res, next) {
    epic.grab_total_staked()
        .then(result => {

            return res.send(JSON.parse(result).data)
        })
        .catch(e => res.send(e))
});


/* GET RICHLIST */
router.get('/richlist', function (req, res, next) {
    epic.grab_epic_accounts()
        .then(result => {
            let list = JSON.parse(result).data;


            return res.send(list);
        })
        .catch(e => res.send(e))
});

router.get('/getepicPrice', function(req,res,next) {
    epic.getepicPrice()
        .then(result => res.send(result))
        .catch(e => res.send(e))
});

router.get('/getIOSTInContract', function(req,res,next) {
    epic.getIOSTInContract()
        .then(result => res.send(result))
        .catch(e => res.send(e))
});

module.exports = router;
