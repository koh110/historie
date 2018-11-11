const assert = require('assert')
const util = require('util')
const execFile = util.promisify(require('child_process').execFile)
const exec = util.promisify(require('child_process').exec)
const config = require('config')

const main = async () => {
  assert.strictEqual(process.env.NODE_ENV, 'test', ' test only')

  const mysqlCommand = async (command) => {
    const mysqlPath = (await execFile('which', ['mysql'])).stdout.trim()
    const { host, port } = config.get('db.connect.connection')
    const res = await exec(`${mysqlPath} -uroot -h${host} -P${port} -e"${command}"`, {
      env: { MYSQL_PWD: 'root' }
    })

    return res
  }

  await mysqlCommand(`DROP DATABASE IF EXISTS ${config.get('db.connect.connection.database')};`)
  await mysqlCommand(`CREATE DATABASE ${config.get('db.connect.connection.database')};`)

  const instance = require('../model').knex
  await instance.migrate.latest().finally(() => instance.destroy())
}

// eslint-disable-next-line no-console
main().then(() => console.log('drop and create database:', config.get('db.connect.connection.database'))).catch(err => console.error(err))
