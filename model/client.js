const mysql = require('mysql');
const Promise = require('bluebird');

const config = {
  user: process.env.MYSQL_USERNAME || 'codenames_access',
  password: process.env.MYSQL_PW || 'codenames_password',
  database: 'CODENAMES',
};

const client = mysql.createConnection(config);
Promise.promisifyAll(client);

module.exports = client;
