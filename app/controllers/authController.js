var User = require('../models/user');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');

/**
 * registrate user
 * @param {new user object} req 
 * @param {token} res 
 */
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

        // TODO
        // create a token
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86500 // expires in 24 hours
        });

        res.status(200).send({auth: true, token: token});
    });
}

/**
 * get user, not sure for what
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.get = function(req, res, next) {

    User.findById(req.userId, {password: 0}, function(err, user) {
        if(err) {
            return res.status(500).send('There was a problem finding the user.');
        }

        if(!user) {
            return res.status(404).send('No user found.');
        }

        res.status(200).send(user);
    });
}

/**
 * login user
 * @param {*} req 
 * @param {*} res 
 */
exports.login = function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            return res.status(500).send('Error on the server');
        }
        if(!user) {
            return res.status(404).send('No user found');
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid) {
            return res.status(401).send({auth: false, token: null});
        }

        var token = jwt.sign({id: user._id}, config.secret, {
            // algorithm: 'RS256',
            expiresIn: 7200,
            subject: JSON.stringify(user._id)
        });

        res.status(200).send({
            auth: true,
            token: token,
            expiresIn: 120,
            currentUser: user._id
        });
    });
}

/**
 * logout user
 * @param {*} req 
 * @param {*} res 
 */
exports.logout = function(req, res) {
    res.status(200).send({auth: false, token: null});
}