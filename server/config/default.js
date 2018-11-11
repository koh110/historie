
module.exports = {
  db: {
    connect: {
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        port: '3306',
        database: 'sntagger',
        user: 'sntagger',
        password: 'dev'
      }
    },
    tables: {
      users: 'users'
    }
  }
}
