var Comment = require('../models/comment');

exports.getAll = function(req, res) {
    Comment.find(function(err, comments) {
        if(err) {
            res.send(err);
        }
        res.json(comments);
    });
}

exports.getById = function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if(err) {
            res.send(err);
        }
        res.json(comment);
    });
}

exports.create = function(req, res) {
    var comment = new Comment();
    comment.postId = req.body.postId;
    comment.text = req.body.text;
    comment.commentTime = req.body.commentTime;
    comment.username = req.body.username;

    // save comment and check for errors
    comment.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json({message: 'Comment created'});
    });
}

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