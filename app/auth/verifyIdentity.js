var jwt = require('jsonwebtoken');
var config = require('../../config');

function verifyIdentity(req, user_id) {
    var token = req.headers['authorization'];
    if(!token) {
        return res.status(403).send({auth: false, message: 'No token provided.'});
    }

    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {
            console.error(err);
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        }

        // check if content id and user id fit
        // debug
        console.log('decoded.id: ', decoded.id);
        console.log('user_id: ', user_id);
        console.log('decoded: ', decoded);

        if(decoded.id === user_id) {
            console.log('ture');
            return true;
        }

        return false;
    });
}

module.exports = verifyIdentity;