const { createBoard} = require('../createBoard');

function testFunc(N) {
  let err = false;
  let perm = new Set();
  for (let i = 0; i < N && N < 2300; i++) {
    if (perm.size === perm.add(createBoard()).size) {
      console.log(`Repeat at permutation #${i + 1}`);
      err = true;
    }
  }
  if (err) console.log(`${perm.size} of ${N} boards created`);
  else console.log(`all ${N} boards unique!`);
}

function logSets(N) {
  for (let i = 0; i < N; i++) {
    console.log(createBoard());
  }
}

logSets(20);

module.exports = {
  testFunc
}

