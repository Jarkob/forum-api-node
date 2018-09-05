var Topic = require('../models/topic');
var verifyIdentity = require('../auth/verifyIdentity');

/**
 * get all topics
 * @param {*} req 
 * @param {*} res 
 */
exports.getAll = function(req, res) {
    Topic.find({}, function(err, topics) {
        if (err) {
            res.send(err);
        }
        res.json(topics);
    });
}

/**
 * get one topic by id
 * @param {*} req 
 * @param {*} res 
 */
exports.getById = function(req, res) {
    Topic.findOne({'_id': req.params.topic_id}, function(err, topic) {
        if (err) {
            res.send(err);
        }
        res.json(topic);
    });
}

/**
 * create new topic
 * @param {contains the new topic object} req 
 * @param {*} res 
 */
exports.create = function(req, res) {
    var topic = new Topic();
    topic.userId = req.body.userId;
    topic.title = req.body.title;
    topic.postCount = req.body.postCount;
    topic.lastPostId = req.body.lastPostId;
    topic.lastActivity = req.body.lastActivity;

    // save topic and check for errors
    topic.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json(topic);
    });
}

/**
 * update topic
 * @param {contains the new topic object} req 
 * @param {*} res 
 */
exports.update = function(req, res) {
    Topic.findById(req.params.topic_id, function(err, topic) {
        if (err) {
            res.send(err);
        }

        // if user is authorized
        // won't work like this because every client needs to be able to edit the topic attributes
        // if(verifyIdentity(req, post.userId)) {
            // edit topic
            // ugly hack, should not be allowed for normal users
            topic.title = req.body.title;
            topic.postCount = req.body.postCount;
            topic.lastPostId = req.body.lastPostId;
            topic.lastActivity = req.body.lastActivity;
    
            // save the topic
            topic.save(function(err) {
                if(err) {
                    res.send(err);
                }
                res.json({message: 'Topic updated'});
            });
        // } else {
        //     res.status(403).send({auth: false, message: 'You can only edit your own topics'});
        // }
    });
}

/**
 * delete topic
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = function(req, res) {
    Topic.findById(req.params.topic_id, function(err, topic) {
        if (err) {
            res.send(err);
        }

        console.log('topic userid: ', topic.userId);

        // if user is authorized
        if (verifyIdentity(req, topic.userId)) {
            // delete topic
            Topic.remove({
                _id: req.params.topic_id
            }, function(err, topic) {
                if (err) {
                    res.send(err);
                }
                res.json({message: 'Topic deleted'});
            });
        } else {
            res.status(403).send({auth: false, message: 'You can only delete your own topics.'});
        }
    });
}