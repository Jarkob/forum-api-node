var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    _id: String,
    topicId: String,
    title: String,
    text: String,
    status: String,
    postTime: Date,
    username: String
});

module.exports = mongoose.model('Post', PostSchema);