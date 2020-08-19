/** @description creates 4 bit arrays, 2 for each player's assassins and agents.
 * 3 agents exist on both boards, but all the other values can conflict entirely
 * @return {[Int32Array]}
 */
function createBoard() {
  const overlap = fill(0, 3);
  const p1Sass = fill(overlap, 3);
  const p2Sass = fill(overlap, 3);
  const p1Agents = fill((overlap | p1Sass), 6) | overlap;
  const p2Agents = fill((overlap | (p2Sass | p1Agents)), 6) | overlap;

  return [p1Agents, p1Sass, p2Agents, p2Sass];
}

/**
 *
 * @param {Int32Array} bits
 * @param {Number} N
 * @return {Int32Array} with N values that do not conflict with bits
 */
function fill(bits, N) {
  const rand = () => 2**Math.floor(Math.random() * 25);
  let result = 0;
  for (let i = 0; i < N; i++) {
    let j = rand();
    while (bits === (bits |= j)) j = rand();
    result |= j;
  }
  return result;
};

/**
 *
 * @param {Number} N
 * @return {[[Int32Array]]}
 */
function createGameSet(N) {
  const permutations = [];
  while (permutations.length < N) {
    permutations.push(createBoard());
  }
  return permutations;
}

module.exports = {
  createBoard,
  createGameSet,
};
