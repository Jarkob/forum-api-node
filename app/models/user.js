var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: String,
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    birthdate: Date
});

module.exports = mongoose.model('User', UserSchema);