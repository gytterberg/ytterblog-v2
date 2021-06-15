const express = require('express');
const Post = require('../db/post');
const { Op } = require('sequelize');
const e = require('express');
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
      offset: Number(req.query.pageNum - 1) * Number(req.query.pageSize),
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
  // along with next and prev post ids
  try {
    // console.log('#######################3');
    // console.log(req);
    const post = await Post.findByPk(Number(req.params.id), { raw: true });

    if (post === null) {
      // we're just looking for the post with ID. send 404 error
      const err = new Error('Post not found');
      err.status = 404;
      throw err;
    } else {
      // we found a post
      // get the adjacent posts
      const prev = await Post.findOne({
        where: { createdAt: { [Op.lt]: post.createdAt } },
        limit: 1,
        order: [['createdAt', 'DESC']],
        raw: true,
      });
      const next = await Post.findOne({
        where: { createdAt: { [Op.gt]: post.createdAt } },
        limit: 1,
        order: [['createdAt', 'ASC']],
        raw: true,
      });
      post.prev = prev === null ? null : prev.id;
      post.next = next === null ? null : next.id;
      res.json(post);
    }
  } catch (error) {
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
