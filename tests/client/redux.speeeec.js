// test redux store
const chai = require('chai');
const expect = chai.expect;

const chaiExclude = require('chai-exclude');
chai.use(chaiExclude);

const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);

/// see https://www.chaijs.com/plugins/chai-exclude/

// const sinon = require('sinon');
// const request = require('supertest');

// const Post = require('../../server/db/post');
const app = require('../../server');
const seed = require('../../script/seed');

const { db, Post } = require('../../server/db');

let testPosts; // to be set inside beforeEach

// Test redux store

describe('>>>> Redux store', () => {
  // get findAll method of Post as postFindAll

  // const { findAndCountAll: postFindAndCountAll } = Post;

  beforeEach(async () => {
    testPosts = await seed();
  });
});
