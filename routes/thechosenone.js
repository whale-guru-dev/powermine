var express = require('express');
var router = express.Router();
var thechosenone = require('../thechosenone/api');

router.get('/previous_king_knights_list', function (req, res, next) {
    thechosenone.grab_previous_king_knights_list()
        .then(result => {

            return res.send(JSON.parse(result).data)
        })
        .catch(e => res.send(e))
});

router.get('/king_of_renown', function (req, res, next) {
    thechosenone.grab_king_of_renown()
        .then(result => {

            return res.send(JSON.parse(result).data)
        })
        .catch(e => res.send(e))
});

router.get('/king_of_week', function (req, res, next) {
    thechosenone.grab_king_of_week()
        .then(result => {

            return res.send(JSON.parse(result).data)
        })
        .catch(e => res.send(e))
});


router.get('/sitting_king', function (req, res, next) {
    thechosenone.grab_setting_king()
        .then(result => {

            return res.send(JSON.parse(result).data)
        })
        .catch(e => res.send(e))
});

router.get('/get_user_stats', async function(req, res, next) {
    thechosenone.getUserKeys().then(result => {
        Promise.all(result).then(userstat => {
            res.send(userstat);
        })
    });
});

router.get('/get_round_number', async function(req, res, next) {
    thechosenone.grab_round_number().then(result => {
        return res.send(JSON.parse(result).data)
    });
});

module.exports = router;