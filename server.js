// import modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Topic = require('./app/models/topic');

// connect to db
mongoose.connect('mongodb://127.0.0.1:27017');

// use bodyParser to get POST data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set port

// define routes
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // logging
    console.log('Something is happening.');
    next(); // go to next route
});

// test route
router.get('/', function(req, res) {
    res.json({message: 'api works'});
});

// more routes
router.route('/topics')
    // get all topics
    .get(function(req, res) {
        Topic.find(function(err, topics) {
            if(err) {
                res.send(err);
            }
            res.json(topics);
        })
    })

    // create new topic
    .post(function(req, res) {
        var topic = new Topic();
        topic.title = req.body.title;

        // save topic and check for errors
        topic.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Topic created'});
        });
    });

router.route('/topics/:topic_id')
    // get topic by id
    .get(function(req, res) {
        Topic.findById(req.params.topic_id, function(err, topic) {
            if(err) {
                res.send(err);
            }
            res.json(topic);
        });
    })

    // update topic by id
    .put(function(req, res) {
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
    })

    .delete(function(req, res) {
        Topic.remove({
            _id: req.params.topic_id
        }, function(err, topic) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Topic deleted'});
        })
    });

app.use('/api', router);

// start server
app.listen(port);
console.log('Api works on port ' + port);