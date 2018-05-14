var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    postId: String,
    userId: String,
    text: String,
    commentTime: Date,
    username: String
});

module.exports = mongoose.model('Comment', CommentSchema);