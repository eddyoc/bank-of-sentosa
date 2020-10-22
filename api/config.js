require('dotenv').config();

const querystrings = 'retryWrites=true&w=majority&authSource=admin';

const CONFIG = {
  current_env: process.env.CURRENT_ENV || 'production', // Current ENV
  port: process.env.PORT || '3001', // Port
  mongodb_uri: process.env.MONGODB_URI || `mongodb+srv://user:pinguPongo@cluster0.ipin2.gcp.mongodb.net/sentosa-bank?${querystrings}`,
  jwt_secret_key: process.env.JWT_SECRET_KEY || 'f5HxCefwrdShD8P8ncPh4qFAktdnjAujASWjGxdmDVHHD4rZKWpBbjPEcDqmeP7u',
  jwt_expiration: process.env.JWT_EXPIRATION || '1d',
};

module.exports = CONFIG;
