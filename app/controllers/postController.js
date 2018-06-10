var Post = require('../models/post');

/**
 * get all posts
 * @param {*} req 
 * @param {*} res 
 */
exports.getAll = function(req, res) {
    Post.find(function(err, posts) {
        if(err) {
            res.send(err);
        }
        res.json(posts);
    });
}

/**
 * get all posts for a specific topic
 * @param {*} req 
 * @param {*} res 
 */
exports.getByTopicId = function(req, res) {
    Post.find({topicId: req.params.topic_id}, function(err, posts) {
        if(err) {
            res.send(err);
        }
        res.json(posts);
    })
}

/**
 * get one post by id
 * @param {*} req 
 * @param {*} res 
 */
exports.getById = function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if(err) {
            res.send(err);
        }
        res.json(post);
    });
}

/**
 * create new post
 * @param {contains the new post object} req 
 * @param {*} res 
 */
exports.create = function(req, res) {
    var post = new Post();
    post.topicId = req.body.topicId;
    post.title = req.body.title;
    post.text = req.body.text;
    post.status = req.body.status;
    // set time
    post.postTime = req.body.postTime ? req.body.postTime : new Date();
    post.username = req.body.username;

    // save Post and check for errors
    post.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json(post);
    });
}

/**
 * update post
 * @param {*} req 
 * @param {*} res 
 */
exports.update = function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if(err) {
            res.send(err);
        }
        post.topicId = req.body.topicId;
        post.title = req.body.title;
        post.text = req.body.text;
        post.status = req.body.status;
        post.postTime = req.body.postTime;
        post.username = req.body.username;

        // save the Post
        post.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Post updated'});
        });
    });
}

/**
 * delete post
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = function(req, res) {
    Post.remove({
        _id: req.params.post_id
    }, function(err, post) {
        if(err) {
            res.send(err);
        }
        res.json({message: 'Post deleted'});
    });
}