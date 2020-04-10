var express = require('express');
var router = express.Router();
var ContentModel = require('../models/content');

router.post('/content', function(req, res, next) {
    var data = req.body;

    var content = new ContentModel(data);

    ContentModel.findOneAndUpdate(
        {name: data.name}, // find a document with that filter
        {name: data.name, content: data.content}, // document to insert when nothing was found
        {upsert: true, new: true, runValidators: true}, // options
        function (err, contentIns) { // callback
            if (err) {
                console.log(err)
                res.json({status: 'error'})
            } else {
                // handle document
                console.log(contentIns)
                res.json({status: 'success'})
            }
        }
    );
});

router.get('/content', function(req, res, next) {
    ContentModel.findOne({name: 'bankRollAsset'}, function(err, content) {
        if(err) {
            console.log(err)
            res.json({status: 'error'})
        } else if(content) {
            console.log(content)
            res.json({status: 'success', content: content})
        }
    })
});



module.exports = router;
