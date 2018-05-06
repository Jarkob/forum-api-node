var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    _id: String,
    title: String
});

module.exports = mongoose.model('Topic', TopicSchema);