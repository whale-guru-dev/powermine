//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var richlistSchema = new Schema({
    name: String,
    richList: String
});

var RichlistModel = mongoose.model('RichList', richlistSchema );

module.exports = RichlistModel;