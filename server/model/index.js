const config = require('config')

const knex = require('knex')(config.get('db.connect'))

exports.knex = knex
exports.User = require('./user')
