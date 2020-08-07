// express, listen, etc
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const {createBoard} = require('./createBoard');
const {cache} = require('./model');

const app = express();
app.use(morgan('dev'));

// path '/' - send front page
// --> big "Start Game" button
// --> sends a request to the server for a new game
let dist = path.resolve(__dirname, 'dist');

app.use(express.static(dist));

let idCount = 0;

app.get('/api/newgame', (req, res) => {
  // create new game
  let gameBoard = createBoard();
  //write to redis

  cache.setexAsync(idCount, 3600, JSON.stringify(gameBoard))
    .then(() => {
      res.send({gameID: idCount.toString()});
      idCount++;
    }).catch(e => {
      console.log(e);
      res.status(400).send(e);
    });
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
        //console.log(json);
        res.send(json);
      }).catch(e => {
        console.log(e);
        res.status(400).send(e);
      });;
  } else {
    res.sendStatus(400)
  }
});

app.listen(3001, (e) => {
  if (e) {
    console.log('error detected: \n', e);
    process.exit(0);
  } else {
    console.log('now listening on port 3001');
  }
});