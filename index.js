// express, listen, etc
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const {createGameSet} = require('./createBoard');
const {cache, getGameData} = require('./model');
const {renderHtml} = require('./prerender');

const app = express();
app.use(morgan('dev'));

app.get('/g/', async (req, res) => {
  let gameID = req.query.gameID;
  let player = req.query.player;

  if (player > 0 && player < 3 && gameID) {
    getGameData(gameID, player).then(data => {
      let {agents, sass} = data;
      let html = renderHtml(gameID, player === 2, agents, sass);
      res.send(html);
    }).catch(e => {
      console.log(e);
      res.sendStatus(400) // AND ERROR PAGE
    })
  }
});

let dist = path.resolve(__dirname, 'dist');

app.use(express.static(dist));

app.get('/api/fill', async (req, res) => {
for (let game of createGameSet(2560)) {
  cache.set(
    counter.toString(16), JSON.stringify(game), (e, bool
      ) => {
      if (e) {
        console.log(e, bool)
        res.sendStatus(400);
      };
    });
  }
});

const PORT = process.env.PORT || 80;

app.listen(PORT, (e) => {
  if (e) {
    console.log('error detected: \n', e);
    process.exit(0);
  } else {
    console.log(`now listening on port ${PORT}`);
  }
});