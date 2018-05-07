var Topic = require('../models/topic');

exports.getAll = function(req, res) {
    Topic.find(function(err, topics) {
        if(err) {
            res.send(err);
        }
        res.json(topics);
    });
}

exports.getById = function(req, res) {
    Topic.findById(req.params.topic_id, function(err, topic) {
        
        // debug
        console.log(req.params.topic_id);
        
        if(err) {
            res.send(err);
        }
        res.json(topic);
    });
}

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