var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    topicId: String,
    title: String,
    text: String,
    status: String,
    postTime: Date,
    username: String
});

module.exports = mongoose.model('Post', PostSchema);