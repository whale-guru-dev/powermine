var express = require('express');
var router = express.Router();
var RichListModel = require("../models/richlist");

router.post('/per', function(req, res, next) {
    var data = req.body;

    RichListModel.findOne(
        {name: "per"},
        function (err, richList) { // callback
            if (err) {
                console.log(err)
                res.json({status: 'error'})
            } else {
                // handle document
                console.log(contentIns)
                res.json({richList: richList})
            }
        }
    );
});

router.post('/iost', function(req, res, next) {
    var data = req.body;

    RichListModel.findOne(
        {name: "iost"},
        function (err, richList) { // callback
            if (err) {
                console.log(err)
                res.json({status: 'error'})
            } else {
                // handle document
                console.log(contentIns)
                res.json({richList: richList})
            }
        }
    );
});

module.exports = router;
