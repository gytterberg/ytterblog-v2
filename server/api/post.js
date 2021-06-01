const express = require('express');
const Post = require('../db/post');
const router = express.Router();

// matches GET requests to /api/posts/
router.get('/', function (req, res, next) {
  /* etc */
});

// matches POST requests to /api/posts/
router.post('/', function (req, res, next) {
  /* etc */
});

// matches PUT requests to /api/posts/:postId
router.put('/:postId', function (req, res, next) {
  /* etc */
});

// matches DELETE requests to /api/posts/:postId
router.delete('/:postId', function (req, res, next) {
  /* etc */
});

module.exports = router;
