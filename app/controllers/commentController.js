var Comment = require('../models/comment');
var verifyIdentity = require('../auth/verifyIdentity');

/**
 * get all comments (obsolete)
 * @param {*} req 
 * @param {*} res 
 */
exports.getAll = function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
}

/**
 * get all comments of a post
 * @param {*} req 
 * @param {*} res 
 */
exports.getByPostId = function(req, res) {
    Comment.find({postId: req.params.post_id}, function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    })
}

/**
 * get one comment by id
 * @param {*} req 
 * @param {*} res 
 */
exports.getById = function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) {
            res.send(err);
        }
        res.json(comment);
    });
}

/**
 * create new comment
 * @param {contains the comment object} req 
 * @param {*} res 
 */
exports.create = function(req, res) {
    var comment = new Comment();
    comment.postId = req.body.postId;
    comment.text = req.body.text;
    // set time
    comment.commentTime = req.body.commentTime ? req.body.commentTime : new Date();
    comment.username = req.body.username;
    comment.userId = req.body.userId;

    // save comment and check for errors
    comment.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json(comment);
    });
}

/**
 * update comment
 * @param {contains the new comment object} req 
 * @param {*} res 
 */
exports.update = function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) {
            res.send(err);
        }
        
        // if user is authorized
        if (verifyIdentity(req, comment.userId)) {
            // edit comment
            comment.text = req.body.text;
            
            // save the comment
            comment.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({message: 'Comment updated'});
            });
        } else {
            res.status(403).send({auth: false, message: 'You can only edit your own comments.'});
        }
    });
}

/**
 * delete comment
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) {
            res.send(err);
        }

        // if user is authorized
        if (verifyIdentity(req, comment.userId)) {
            // delete comment
            Comment.remove({
                _id: req.params.comment_id
            }, function(err, comment) {
                if (err) {
                    res.send(err);
                }
                res.json({message: 'Comment deleted'});
            });
        } else {
            // unauthorized
            res.status(403).send({auth: false, message: 'You can only delete your own comments.'});
        }
    });
}