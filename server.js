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
var router = require('router');

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


app.use('/api', router);

// start server
app.listen(port);
console.log('Api works on port ' + port);