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


module.exports = router;