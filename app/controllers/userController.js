var User = require('../models/user');

var bcrypt = require('bcryptjs');

exports.getAll = function(req, res) {
    User.find(function(err, users) {
        if(err) {
            res.send(err);
        }
        res.json(users);
    });
}

exports.getById = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
}

exports.create = function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    var user = new User();
    user.username = req.body.username;
    user.password = hashedPassword;
    user.email = req.body.email;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.birthdate = req.body.birthdate;

    // save user and check for errors

    // TODO
    res.send('NOT IMPLEMENTED: create User POST');
}

exports.update = function(req, res) {
    // TODO
    res.send('NOT IMPLEMENTED: update User PUT');
}

exports.delete = function(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err, user) {
        if(err) {
            res.send(err);
        }
        res.json({message: 'User deleted'});
    });
}