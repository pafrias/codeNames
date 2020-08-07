const Promise = require("bluebird");

const redis = require('redis');
const cache = redis.createClient();
Promise.promisifyAll(cache);

cache.setAsync('foo', 'bar').then(reply => {

  if (reply !== 'OK') throw new Error();
  return cache.getAsync('foo')

}).then(val => {

  if (val !== 'bar') throw new Error();
  return cache.delAsync('foo');

}).catch(e => {
  console.log('error creating redis client\n', e);
  process.exit(0);
});

module.exports = {
  cache
}