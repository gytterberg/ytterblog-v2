const { db } = require('./server/db');
const app = require('./server');
const chalk = require('chalk');

const port = process.env.PORT || 1337; // this can be very useful if you deploy to Heroku!

console.log(chalk.yellow('Syncing db...'));
db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(() => {
    console.log(chalk.green('db synced'));
    app.listen(port, () =>
      console.log(`studiously serving silly sounds on port ${port}`)
    );
  });
