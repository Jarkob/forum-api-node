var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    title: String,
    postCount: Number,
    lastPostId: String,
    lastActivity: Date
});

module.exports = mongoose.model('Topic', TopicSchema);