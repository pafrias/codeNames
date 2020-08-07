
// return 4 bit arrays, 2 for each player's assassins and agents
function createBoard() {
  let board = 0,
  p1Agents = 0,
  p2Agents =  0,
  p1Sass =  0,
  p2Sass = 0;

  let rand = () => Math.floor(Math.random() * 25)

  // insert player 1 agents
  for (let i = 0; i < 8;) {
    let j = 2**rand();
    if (board !== (board | j)) {
      board |= j;
      p1Agents |= j;
      i++;
    }
  }

  // insert player 1 assassins
  for (let i = 0; i < 3;) {
    let j = 2**rand();
    if (board !== (board | j)) {
      board |= j;
      p1Sass |= j;
      i++;
    }
  }

  // insert player 2 agents
  for (let i = 0; i < 8;) {
    let j = 2**rand();
    if (board !== (board | j)) {
      board |= j;
      p2Agents |= j;
      i++;
    }
  }

  // insert player 2 assassins
  for (let i = 0; i < 3;) {
    let j = 2**rand();
    if (board !== (board | j)) {
      board |= j;
      p2Sass |= j;
      i++;
    }
  }

  return [p1Agents, p1Sass, p2Agents, p2Sass];
}

module.exports = {
  createBoard
}
