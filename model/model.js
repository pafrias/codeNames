const client = require('./client');
const {createGameSet} = require('./createBoard');

const db = {

  insertGame: async function(data, id = undefined) {
    let q;
    if (id === undefined) {
      q = client.format(
          `INSERT INTO CODENAMES.Boards
      (p1Agents, p1Sass, p2Agents, p2Sass)
      values (?,?,?,?)`, data);
    } else {
      q = client.format(
          `INSERT INTO CODENAMES.Boards
        (id, p1Agents, p1Sass, p2Agents, p2Sass)
        values (?,?,?,?,?)`, [id, ...data]);
    }

    return client.queryAsync(q);
  },

  getGame: async function(gameID) {
    const q = client.format(
        `SELECT * FROM CODENAMES.Boards
      where id=?`, [gameID]);
    return client.queryAsync(q).then((data) => data);
  },

  getGameByPlayer: async function(gameID, player) {
    const cols = player === '1'
      ? ['p1Agents', 'p1Sass']
      : ['p2Agents', 'p2Sass'];

    const q = client.format(
        'SELECT ?? as agents, ?? as sass FROM CODENAMES.Boards WHERE id=?',
        [...cols, gameID]);

    // console.log(q);

    return client.queryAsync(q);
  },

  loadNewGames: async function() {
    const data = createGameSet(2560);
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
      await this.insertGame(data[i], i+1)
          .catch((e) => {
            console.log(e);
            return e;
          });
    }
  },

};

// eslint-disable-next-line max-len
client.pingAsync().then(() => db.insertGame([2, 4, 6, 8]))
    .then((res) => db.getGame(res.insertId))
    .then((res) => client.queryAsync(`DELETE FROM CODENAMES.Boards WHERE id=${res[0].id}`))
    .then(() => console.log(' database connected'))
    .catch((e) => {
      console.log('error establishing db connection\n', e);
      process.exit(0);
    });

module.exports = db;
