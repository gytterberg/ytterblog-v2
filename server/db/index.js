// bring database together with models

// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./database');
const Post = require('./post');
// const Comment = require('./comment');

// Model associations (table relationships) below

// Comment.belongsTo(Post);
// Post.hasMany(Comment);

// Include your models in this exports object as well!
module.exports = {
  db,
  Post,
};
