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
router.get('/topic/:topic_id', topicController.getById);
router.post('/topics', VerifyToken, topicController.create);
router.put('/topics/:topic_id', topicController.update);
router.delete('/topics/:topic_id', topicController.delete);

// post routes
// router.get('/posts', postController.getAll); // obsolete
router.get('/posts/:topic_id', postController.getByTopicId);
router.get('/post/:post_id', postController.getById);
router.post('/posts', VerifyToken, postController.create);
router.put('/posts/:post_id', postController.update);
router.delete('/posts/:post_id', postController.delete);

// comment routes
router.get('/comments', commentController.getAll);
router.get('/comments/:post_id', commentController.getByPostId);
router.get('/comment/:comment_id', commentController.getById);
router.post('/comments', VerifyToken, commentController.create);
router.put('/comments/:comment_id', commentController.update);
router.delete('/comments/:comment_id', commentController.delete);

// user routes
router.get('/users', userController.getAll);
router.get('/user/:user_id', userController.getById);
router.post('/users', userController.create);
router.put('/users/:user_id', userController.update);
router.delete('/users/:user_id', userController.delete);

// auth test routes
// TODO
router.post('/register', authController.register);
router.get('/me', VerifyToken, authController.get);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;