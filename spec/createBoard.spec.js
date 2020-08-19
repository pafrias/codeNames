const {createBoard} = require('../model/createBoard');

/**
 * @description Tests N boards for uniqueness from the createBoard func
 * @param {Number} N
 */
function testFunc(N) {
  let err = false;
  const perm = new Set();
  for (let i = 0; i < N && N < 2300; i++) {
    if (perm.size === perm.add(createBoard()).size) {
      console.log(`Repeat at permutation #${i + 1}`);
      err = true;
    }
  }
  if (err) console.log(`${perm.size} of ${N} boards created`);
  else console.log(`all ${N} boards unique!`);
}

testFunc(2000);

module.exports = {
  testFunc,
};

