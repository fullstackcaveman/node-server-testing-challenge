const knex = require('knex');

const config = require('../knexfile');

const enviornment = process.env.DB_ENV || 'development';

module.exports = knex(config[enviornment]);
