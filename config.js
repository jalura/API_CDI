// config.js
const dotenv = require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'desarrollo',
    HOST: process.env.HOST || '127.0.0.69',
    PORT: process.env.PORT || 3000,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASS: process.env.DB_PASS || 'macRoot2021',
    DB_NAME: process.env.DB_NAME || 'IMSS_CDI',
    TRACE: process.env.TRACE || '1'
  }