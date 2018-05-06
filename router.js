var express = require('express');
var router = express.Router();

// controllers
var topicController = require('./app/controllers/topicController');
var postController = require('./app/controllers/postController');
var commentController = require('./app/controllers/commentController');

// topic routes
router.get('/topics', topicController.getAll);
router.get('/topics/:topic_id', topicController.getById);
router.post('/topics', topicController.create);
router.put('/topics/:topic_id', topicController.update);
router.delete('/topics/:topic_id', topicController.delete);

// post routes
router.get('/posts', postController.getAll);
router.get('/posts/:post_id', postController.getById);
router.post('/posts', postController.create);
router.put('/posts/:post_id', postController.update);
router.delete('/posts/:post_id', postController.delete);

// comment routes
router.get('/comments', commentController.getAll);
router.get('/comments/:comment_id', commentController.getById);
router.post('/comments', commentController.create);
router.put('/comments/:comment_id', commentController.update);
router.delete('/comments/:comment_id', commentController.delete);

module.exports = router;