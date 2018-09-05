var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    userId: String,
    title: String,
    postCount: Number,
    lastPostId: String,
    lastActivity: Date
});

module.exports = mongoose.model('Topic', TopicSchema);