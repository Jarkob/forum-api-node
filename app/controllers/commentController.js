var Comment = require('../models/comment');

/**
 * get all comments (obsolete)
 * @param {*} req 
 * @param {*} res 
 */
exports.getAll = function(req, res) {
    Comment.find(function(err, comments) {
        if(err) {
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
        if(err) {
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
        if(err) {
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

    // save comment and check for errors
    comment.save(function(err) {
        if(err) {
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
        if(err) {
            res.send(err);
        }
        comment.postId = req.body.postId;
        comment.text = req.body.text;
        comment.commentTime = req.body.commentTime;
        comment.username = req.body.username;

        // save the comment
        comment.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Comment updated'});
        });
    });
}

/**
 * delete comment
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = function(req, res) {
    Comment.remove({
        _id: req.params.comment_id
    }, function(err, comment) {
        if(err) {
            res.send(err);
        }
        res.json({message: 'Comment deleted'});
    })
}