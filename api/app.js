require('module-alias/register');
const chalk = require('chalk');
const { openConnection } = require('@db');
const { app } = require('./middleware/express');

const CONFIG = require('./config');

// Start the app
app.listen(CONFIG.port, async () => {
   console.log(
      '%s App is running at http://localhost:%d in %s mode',
      chalk.green('✓'),
      process.env.PORT,
      process.env.CURRENT_ENV
   );
   console.log('Press CTRL-C to stop\n');
   openConnection();
});

module.exports = app;
