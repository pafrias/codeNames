// return 4 bit arrays, 2 for each player's assassins and agents
function createBoard() {
  let board = 0,
  p1Agents = 0,
  p2Agents = 0,
  p1Sass =  0,
  p2Sass = 0;

  let rand = () => Math.floor(Math.random() * 25)

  for (let i = 0; i < 22; i++) {
    let j = 2**rand();
    while (board === (board |= j)) j = 2**rand();

    if ([3,6,9].includes(i)) p1Sass |= j;
    else if ([4,7,10].includes(i)) p2Sass |= j;
    else if (i % 2) p1Agents |= j;
    else p2Agents |= j;
  }

  return [p1Agents, p1Sass, p2Agents, p2Sass];
}

function createGameSet(N) {
  let permutations = new Set();
  while(permutations.size < N) {
    permutations.add(createBoard());
  }
  return permutations;
}

module.exports = {
  createBoard,
  createGameSet
}
