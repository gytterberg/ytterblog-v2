// test /api/posts routes
const chai = require('chai');
const expect = chai.expect;

const chalk = require('chalk');

const chaiExclude = require('chai-exclude');
chai.use(chaiExclude);

const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);

/// see https://www.chaijs.com/plugins/chai-exclude/

const sinon = require('sinon');
const request = require('supertest');

const Post = require('../../server/db/post');
const app = require('../../server');
const seed = require('../../script/seed');

let testPosts; // to be set inside beforeEach

// test API routes alone, ie without actually using the database
// replacing Sequelize modesl methods with spies

describe('>>>> Express API routes for posts', () => {
  // get findAll method of Post as postFindAll

  // const { findAndCountAll: postFindAndCountAll } = Post;

  beforeEach(async () => {
    testPosts = await seed();
  });

  // test GET route
  describe('#### GET routes', () => {
    it('GET /api/posts responds with all posts', async () => {
      const response = await request(app).get('/api/posts').expect(200);
      // can't use exclude with equalInAnyOder apparently :(
      expect(
        response.body.posts.map((post) => ({
          title: post.title,
          body: post.body,
          user: post.user,
        }))
      ).to.deep.equalInAnyOrder(
        testPosts.map((post) => ({
          title: post.title,
          body: post.body,
          user: post.user,
        }))
      );
    });

    it('GET /api/posts/3 responds with post 3', async () => {
      const response = await request(app).get('/api/posts/3').expect(200);
    });

    it('GET /api/posts/3000 responds with 404, user not found', async () => {
      const response = await request(app).get('/api/posts/3000').expect(404);
    });

    it('GET /api/posts?pageSize=1&pageNum=3 responds with paginated result', async () => {
      const response = await request(app)
        .get('/api/posts?pageSize=1&pageNum=3')
        .expect(200);
      expect(response.body.posts.length).to.equal(1);
    });

    it('GET /api/posts?pageSize=20&pageNum=20 responds with 404', async () => {
      const resposne = await request(app)
        .get('/api/posts?pageSize=100000&pageNum=100000')
        .expect(404);
    });
  });

  describe('#### POST routes', () => {
    it('POST /api/posts creates new post', async () => {
      const newPost = {
        title: 'New post title',
        body: 'Some post body',
        user: 'SomeUser99',
      };
      const response = await request(app)
        .post('/api/posts')
        .send(newPost)
        .expect(200);
      expect(response.body)
        .excluding(['id', 'createdAt', 'updatedAt'])
        .to.deep.equal(newPost);
      const newResponse = await request(app)
        .get(`/api/posts/${response.body.id}`)
        .expect(200);
      expect(newResponse.body)
        .excluding(['id', 'createdAt', 'updatedAt'])
        .to.deep.equal(newPost);
    });

    it('POST /api/posts fails helpfully when a post is invalid', async () => {
      // missing user field
      const newPost = {
        title: 'New post title',
        body: 'Some post body',
      };
      const response = await request(app)
        .post('/api/posts')
        .send(newPost)
        .expect(400);
    });
  });

  describe('#### PUT routes', () => {
    it('PUT /api/posts/3 updates post 3', async () => {
      let response = await request(app)
        .put('/api/posts/3')
        .send({ title: 'updated', body: 'updated', user: 'updated' })
        .expect(200);

      response = await request(app).get('/api/posts/3').expect(200);

      expect(response.body)
        .excluding(['id', 'createdAt', 'updatedAt'])
        .to.deep.equal({ title: 'updated', body: 'updated', user: 'updated' });
    });

    it('PUT /api/posts/3000 fails helpfully', async () => {
      let response = await request(app)
        .put('/api/posts/3000')
        .send({ title: 'updated', body: 'updated', user: 'updated' })
        .expect(400);
    });
  });

  describe('#### DELETE routes', () => {
    it('DELETE /api/posts/3 deletes post 3', async () => {
      await request(app).delete('/api/posts/3').expect(200);
      await request(app).get('/api/posts/3').expect(404);
    });
  });
});
