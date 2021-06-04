const { db, Post } = require('../server/db');
const chalk = require('chalk');
// const { post } = require('../server');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  // console.log(chalk.yellow('syncing database...'));
  if (process.env.NODE_ENV !== 'test') {
    console.log(chalk.red('Tried to wipe production DB, aborting'));
    return; // don't wipe DB if we're not in test mode
  }
  await db.sync({ force: true }); // clears db and matches models to tables
  // console.log(chalk.green('db synced!'));

  // Creating test posts
  let posts = await Promise.all([
    Post.create({
      title: 'Test Title1',
      body: 'Test body1',
      user: 'Test user1',
    }),
    Post.create({
      title: 'Test Title2',
      body: 'Test body2',
      user: 'Test user2',
    }),
    Post.create({
      title: 'Test Title3',
      body: 'Test body3',
      user: 'Test user3',
    }),
    Post.create({
      title: 'Test Title4',
      body: 'Test body4',
      user: 'Test user4',
    }),
    Post.create({
      title: 'Test Title5',
      body: 'Test body5',
      user: 'Test user5',
    }),
  ]);
  posts = posts.map((post) => post.dataValues);

  // console.log(`seeded ${posts.length} posts`);
  return posts;
}

/*
We've separated the `seed` function from the `runSeed` function.
This way we can isolate the error handling and exit trapping.
The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log(chalk.green('seeding...'));
  try {
    await seed();
  } catch (err) {
    console.error(chalk.red(err));
    process.exitCode = 1;
  } finally {
    console.log(chalk.yellow('closing db connection'));
    await db.close();
    console.log(chalk.green('db connection closed'));
  }
}

/*
Execute the `seed` function, IF we ran this module directly (`node seed`).
`Async` functions always return a promise, so we can use `catch` to handle
any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)

module.exports = seed;
