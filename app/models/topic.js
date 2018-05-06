var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    title: String
});

module.exports = mongoose.model('Topic', TopicSchema);