const config = require('config')
const { knex } = require('./index')
const user = require('./user')

test('findOrCreate', async () => {
  const twitterId = '1'
  let name = 'test'

  await knex(config.get('db.tables.users'))
    .where('twitter_id', twitterId)
    .del()

  // create
  const insert = await user.findOrCreate({ twitterId: twitterId, name })

  let select = (await knex
    .select('id', 'name', 'twitter_id')
    .from(config.get('db.tables.users'))
    .where('twitter_id', twitterId)
    .limit(1))[0]

  expect(select.name).toBe(name)
  expect(select.twitter_id).toBe(twitterId)
  expect(insert.id).toBe(select.id)

  // find
  name = 'test_updated'
  const find = await user.findOrCreate({ twitterId: twitterId, name })

  select = (await knex
    .select('id', 'name', 'twitter_id')
    .from(config.get('db.tables.users'))
    .where('id', insert.id)
    .limit(1))[0]

  expect(select.name).toBe(name)
  expect(select.twitter_id).toBe(twitterId)
  expect(find.id).toBe(select.id)
})

test('findById', async () => {
  const twitterId = '2'
  const name = 'test'

  const insert = await user.findOrCreate({ twitterId: twitterId, name })
  const find = await user.findById(insert.id)

  const select = (await knex
    .select('id', 'name', 'twitter_id')
    .from(config.get('db.tables.users'))
    .where('id', insert.id)
    .limit(1))[0]

  expect(find.name).toBe(select.name)
  expect(find.twitter_id).toBe(select.twitter_id)
})
