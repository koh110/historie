const connect = require('config').get('db.connect')

const user = process.env.DB_USER || connect.connection.user
const password = process.env.DB_PASSWORD || connect.connection.password

const connection = { ...connect.connection, user, password }

module.exports = { ...connect, connection }
