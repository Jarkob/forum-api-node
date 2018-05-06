var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    _id: String,
    postId: String,
    text: String,
    commentTime: Date,
    username: String
});

module.exports = mongoose.model('Comment', CommentSchema);