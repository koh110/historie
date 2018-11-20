# historie

# depands on

`Node.js` >= v10

`mysql` >= v8

`docker` (development)

# Get started

```bash
# on Mac
$ export HOST_IP=`ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}'` && docker-compose up
```

# settings

## mysql

### create database and user

database is `historie` in development.
database is `historie_test` in test.

```bash
$ mysql -uroot -h 127.0.0.1 -P3306 -p

mysql> CREATE DATABASE historie;
mysql> use historie;
mysql> ALTER USER historie@'%' IDENTIFIED WITH mysql_native_password BY 'dev';
mysql> GRANT ALL on `historie`.* to 'historie'@'%';
```

### migrations

```bash
$ cd server
# test
$ npm run migrate:latest:test
# development
$ npm run migrate:latest:dev
```