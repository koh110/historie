// @ts-check

const config = require('config')
const { knex } = require('./index')

/**
 * @param id {string} - database id
 * @returns {Promise<{id: string, name: string, twitter_id: string}>}
 */
exports.findById = async (id) => {
  const query = knex
    .select('id', 'name', 'twitter_id')
    .from(config.get('db.tables.users'))
    .where('id', id)
    .limit(1)

  const [ res ] = await query.then()

  return res
}

/**
 * @param params {object} - params
 * @param params.twitterId {string} - twitter id
 * @param params.name {string} - name
 * @returns {Promise<{id: string, name: string, twitter_id: string}>}
 */
exports.findOrCreate = async ({ twitterId, name }) => {
  const query = knex.raw(
    [
      knex.insert({ 'twitter_id': twitterId, name }).into(config.get('db.tables.users')).toQuery(),
      'ON DUPLICATE KEY UPDATE',
      [
        knex.raw('twitter_id = ?', [twitterId]),
        knex.raw('name = ?', [name]),
        knex.raw('id = LAST_INSERT_ID(id)')
      ].join(',')
    ].join(' ')
  )

  const [ res ] = (await query.then())

  return { id: res.insertId, name, twitter_id: twitterId }
}
