const style = require('./style.js');
const script = require('./script');

/**
 * @param {Number} gameID
 * @param {Boolean} isRotated
 * @param {Int32Array} agents
 * @param {Int32Array} sass
 * @return {String}
 */
function renderHtml(gameID, isRotated, agents, sass) {
  let rows = convertBitsToRows(agents, sass);
  if (isRotated) rows = rows.reverse().map((row) => row.reverse());
  rows = rows.map((row) => `<tr>${row.join('')}</tr>`);
  return template(gameID, isRotated, rows.join(''));
};

/**
 * @param {Int32Array} agents
 * @param {Int32Array} assassins
 * @return {[String]}
 */
function convertBitsToRows(agents, assassins) {
  const rows = Array(5).fill().map(() => Array(5).fill());

  for (let i = 0; i < 25; i++) {
    let td = `<td></td>`;
    if (agents % 2 === 1) {
      td = `<td class="agent"></td>`;
    } else if (assassins % 2 === 1) {
      td = `<td class="assassin"></td>`;
    }
    rows[i%5][Math.floor(i / 5)] = td;
    agents >>= 1;
    assassins >>= 1;
  }

  return rows;
}

const template = (gameID, isRotated, tRows) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aliases X 2</title>
  <style>
    ${style}
  </style>
</head>
<body>
  <nav>
    <button id="new_game">New Game</button>
    <div id="game_id">Game ID: ${gameID}</div>
    <button id="join_game">Join Game</button>
  </nav>
  <table id="game_board">
    <tbody>
      ${tRows}
    </tbody>
  </table>
</body>
<script>
  ${script(isRotated)}
</script>
</body>
</html>
`;


module.exports = {
  renderHtml,
};
