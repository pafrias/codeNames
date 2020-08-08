// express, listen, etc
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const {createGameSet} = require('./createBoard');
const Math = require('mathjs');
const {cache} = require('./model');

const app = express();
app.use(morgan('dev'));


let dist = path.resolve(__dirname, 'dist');
app.use(express.static(dist));

app.get('/api/test', async (req, res) => {
  for (let i = 0; i < 2560; i++) {
    await cache.getAsync(i.toString(16)).catch(e => {
      console.log(e);
      res.sendStatus(400);
    });
  }
  res.sendStatus(200);
});

app.get('/api/game', (req, res) => {
  let gameID = req.query.gameID;
  let player = req.query.player;

  if (player > 0 && player < 3 && gameID) {
    cache.getAsync(gameID)
      .then(reply => {
        let data = eval(reply);
        let json = {
          agents: player === "1" ? data[0] : data[2],
          sass: player === "1" ? data[1] : data[3]
        }
        res.send(json);
      }).catch(e => {
        console.log(e);
        res.status(400).send(e);
      });;
  } else {
    res.sendStatus(400)
  }
});

let counter = 0;

for (let game of createGameSet(2560)) {
  cache.set(counter.toString(16), JSON.stringify(game), (e, bool) => {
    if (e) {
      console.log(e, bool)
      process.exit(1);
    };
  });
  counter++;
}

const PORT = process.env.PORT || 80;

app.listen(PORT, (e) => {
  if (e) {
    console.log('error detected: \n', e);
    process.exit(0);
  } else {
    console.log(`now listening on port ${PORT}`);
  }
});