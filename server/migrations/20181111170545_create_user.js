const config = require('config')

exports.up = (knex, Promise) => {
  return knex.schema.createTable(config.get('db.tables.users'), (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('twitter_id')
    table.unique('twitter_id')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(config.get('db.tables.users'))
}
