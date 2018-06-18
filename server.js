// import modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');

var Topic = require('./app/models/topic');

// use bodyParser to get POST data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set port

// define routes
var router = require('./router');

app.use('/api', router);

// start server
app.listen(port);
console.log('Api works on port ' + port);