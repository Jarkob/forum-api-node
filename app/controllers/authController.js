var User = require('../models/user');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');

exports.register = function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    var user = new User();
    user.username = req.body.username;
    user.password = hashedPassword;
    user.email = req.body.email;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.birthdate = req.body.birthdate;

    user.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(500).send('There was a problem registering the user.');
        }

        console.log('User was created');

        // create a token
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86500 // expires in 24 hours
        });

        res.status(200).send({auth: true, token: token});
    });
}

exports.get = function(req, res) {
    var token = req.headers['x-access-token'];
    if(!token) {
        return res.status(401).send({auth: false, message: 'No token provided.'});
    }

    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        }

        // res.status(200).send(decoded);
        User.findById(decoded.id, function(err, user) {
            if(err) {
                return res.status(500).send('There was a problem finding the user.');
            }

            if(!user) {
                return res.status(404).send('No user found.');
            }

            res.status(200).send(user);
        })
    });
}