var express = require('express');
var router = express.Router();

var VerifyToken = require('./app/auth/verifyToken');

// controllers
var topicController = require('./app/controllers/topicController');
var postController = require('./app/controllers/postController');
var commentController = require('./app/controllers/commentController');
var userController = require('./app/controllers/userController');
var authController = require('./app/controllers/authController');

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

// user routes
router.get('/users', userController.getAll);
router.get('/users/:user_id', userController.getById);
// TODO
router.delete('/users/:user_id', userController.delete);

// auth test routes
router.post('/register', authController.register);
router.get('/me', VerifyToken, authController.get);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;