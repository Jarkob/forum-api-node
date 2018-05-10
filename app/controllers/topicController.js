var Topic = require('../models/topic');

/**
 * get all topics
 * @param {*} req 
 * @param {*} res 
 */
exports.getAll = function(req, res) {
    Topic.find(function(err, topics) {
        if(err) {
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
        if(err) {
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
    topic.title = req.body.title;

    // save topic and check for errors
    topic.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json({message: 'Topic created'});
    });
}

/**
 * update topic
 * @param {contains the new topic object} req 
 * @param {*} res 
 */
exports.update = function(req, res) {
    Topic.findById(req.params.topic_id, function(err, topic) {
        if(err) {
            res.send(err);
        }
        topic.title = req.body.title;

        // save the topic
        topic.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Topic updated'});
        });
    });
}

/**
 * delete topic
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = function(req, res) {
    Topic.remove({
        _id: req.params.topic_id
    }, function(err, topic) {
        if(err) {
            res.send(err);
        }
        res.json({message: 'Topic deleted'});
    })
}