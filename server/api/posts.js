const express = require('express');
const Post = require('../db/post');
const router = express.Router();

////// matches GET requests to /api/posts/
router.get('/', async (req, res, next) => {
  // return all posts unless query params are present

  // set up our pagination parameters, if provided:
  let limit, offset;
  if (typeof req.query.pageSize !== 'undefined') {
    limit = { limit: Number(req.query.pageSize) };
  }
  if (typeof req.query.pageNum !== 'undefined') {
    offset = {
      offset: Number(req.query.pageNum) * (Number(req.query.pageSize) - 1),
    };
  }

  // get the results from the DB, limited by our pagination paramters, and include the total row count
  try {
    const result = await Post.findAndCountAll({
      distinct: true,
      raw: true,
      ...limit,
      ...offset,
      order: [['createdAt', 'DESC']],
    });

    if (result.count > 0 && result.rows.length === 0) {
      throw new Error('Invalid parameters, no results found.');
    }

    // given the total row count and pagesize, we can get the number of pages
    result.pageCount = Math.ceil(result.count / req.query.pageSize);
    result.currentPage = Number(req.query.pageNum);
    result.pageSize = Number(req.query.pageSize);

    // rename rows to posts
    result.posts = result.rows;
    delete result.rows;

    // send it out
    res.json(result);
  } catch (error) {
    // console.log('Error fetching posts from DB');
    error.status = 404;
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  // find a single post and return it
  try {
    const result = await Post.findByPk(req.params.id, { raw: true });
    if (result === null) {
      throw new Error('Post not found');
    }
    console.log('In api, result: ');
    console.log(result);
    res.json(result);
  } catch (error) {
    // console.log(`Error fetching post ${req.params.id}`);
    error.status = 404;
    next(error);
  }
});

/////////// matches POST requests to /api/posts/
router.post('/', async (req, res, next) => {
  // create a new post

  try {
    const response = await Post.create(req.body);
    res.json(response);
  } catch (err) {
    // console.log('Error creating post');
    err.status = 400;
    next(err);
  }
});

// matches PUT requests to /api/posts/:postId
router.put('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    post.title = req.body.title;
    post.body = req.body.body;
    const response = await post.save();
    res.send(response.dataValues);
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

// matches DELETE requests to /api/posts/:postId
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Post.destroy({ where: { id: req.params.id } });
    if (result === 0) {
      throw new Error(`Error deleting post ${req.params.id}.`);
    }
    res.send(`Successfully deleted post ${req.params.id}`);
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

module.exports = router;
