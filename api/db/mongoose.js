const CONFIG = require('../config');
const mongoose = require('mongoose').set(
  'debug',
  CONFIG.current_env === 'development' ? true : false
);
const chalk = require('chalk');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  auth: {
    user: 'user',
    password: 'pinguPongo',
  },
  dbName: 'sentosa-bank',
};
const { connection } = mongoose;

mongoose.connection.on('error', err => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

const openConnection = () => {
  mongoose.connect(CONFIG.mongodb_uri, options);
};

const closeConnection = () => {
  mongoose.connection.close();
};

const onDatabaseDropped = () => {
  console.log(`${ connection.databaseName } database dropped.`)
};

const dropDB = async () => {
  return await connection.dropDatabase(onDatabaseDropped);
};

module.exports = {
  openConnection,
  closeConnection,
  dropDB,
};
