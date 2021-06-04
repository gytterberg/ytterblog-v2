const db = require('./database');
const Sequelize = require('sequelize');

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  body: {
    type: Sequelize.TEXT,
  },
  user: {
    type: Sequelize.STRING, /// temp
    allowNull: false,
  },
});

module.exports = Post;
