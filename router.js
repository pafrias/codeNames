const express = require('express');
const db = require('./model/model.js');
const {renderHtml} = require('./views/prerender');

const router = new express.Router;

router.get('/game/:gameID/:player', (req, res) => {
  const {gameID, player} = req.params;

  db.getGameByPlayer(gameID, player).then((data) => {
    // console.log(data);
    const {agents, sass} = data[0];
    const html = renderHtml(gameID, player === '2', agents, sass);
    res.send(html);
  }).catch((e) => {
    console.log(e);
    res.sendStatus(400); // AND ERROR PAGE?
  });
});

router.get('/g/:gameID', (req, res) => {
  const gameID = req.param.gameID;
  db.getGame(gameID).then((data) => {
    res.send(data);
  }).catch((e) => {
    console.log(e);
    res.sendStatus(400); // AND ERROR PAGE?
  });
});

router.get('/api/fill', async (req, res) => {
  db.loadNewGames().then(() => res.sendStatus(200))
      .catch((e) => res.send(e));
});

module.exports = router;
