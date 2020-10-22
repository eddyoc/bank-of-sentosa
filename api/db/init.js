require('module-alias/register');
const { initDatabase } = require('./seed/populate');
const { openConnection, closeConnection } = require('@db');

const seedDatabase = async () => {
  openConnection();
  await initDatabase();
  closeConnection();
};

seedDatabase();
