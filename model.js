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

async function getGameData (gameID, player) {
  return cache.getAsync(gameID).then(reply => {
    let data = eval(reply);
    return {
      agents: player === "1" ? data[0] : data[2],
      sass: player === "1" ? data[1] : data[3]
    }
  });
};

module.exports = {
  cache,
  getGameData
}