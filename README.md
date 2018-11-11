# sntagger

# depands on

`Node.js` >= v10

`mysql` >= v8

`docker` (development)

# Get started

```bash
$ docker-compose up
```

# settings

## mysql

### create database and user

database is `sntagger` in development.
database is `sntagger_test` in test.

```bash
$ mysql -uroot -h 127.0.0.1 -P3306 -p

mysql> CREATE DATABASE sntagger;
mysql> use sntagger;
mysql> ALTER USER sntagger@'%' IDENTIFIED WITH mysql_native_password BY 'dev';
mysql> GRANT ALL on `sntagger`.* to 'sntagger'@'%';
```

### migrations

```bash
$ cd server
# test
$ npm run migrate:latest:test
# development
$ npm run migrate:latest:dev
```