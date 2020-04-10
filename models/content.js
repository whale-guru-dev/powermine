//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var contentSchema = new Schema({
    name: String,
    content: String
});

var ContentModel = mongoose.model('Content', contentSchema );

module.exports = ContentModel;