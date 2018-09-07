var User = require('../models/user');

var bcrypt = require('bcryptjs');

/**
 * get all users
 * @param {*} req 
 * @param {*} res 
 */
exports.getAll = function(req, res) {
    User.find(function(err, users) {
        if(err) {
            res.send(err);
        }
        res.json(users);
    });
}


/**
 * get one user by id
 * @param {*} req 
 * @param {*} res 
 */
exports.getById = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
}


/**
 * create new user
 * @param {*} req 
 * @param {*} res 
 */
exports.create = function(req, res) {

    // check if duplicate user exists
    User.find({email: req.body.email}, function(err, user) {
        if (err) {
            res.send(err);
        }
        if(!user || user.length != 0) {
            console.error('duplicate user: ', user);
            res.status(400).send('User with email "' + req.body.email + '" already exists.');
        } else {
            var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        
            var user = new User();
            user.username = req.body.username;
            user.password = hashedPassword;
            user.email = req.body.email;
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.birthdate = req.body.birthdate;
        
            // save user and check for errors
            user.save(function(err) {
                if(err) {
                    res.send(err);
                }
                res.json({message: 'User created'});
            });
        }
    });

}


/**
 * update user
 * @param {*} req 
 * @param {*} res 
 */
exports.update = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if(err) {
            res.send(err);
        }
        user.username = req.body.username;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.birthdate = req.body.birthdate;

        // save the user
        user.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'User updated'});
        });
    });
}


/**
 * delete user
 * @param {*} req 
 * @param {*} res 
 */
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