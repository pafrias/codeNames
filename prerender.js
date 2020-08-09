function convertBitsToRows(agents, assassins) {

  let rows = Array(5).fill().map(() => Array(5).fill());

  for (let i = 0; i < 25; i++) {
    let htmlClass = '';
    if (agents % 2 === 1) {
      htmlClass = ' class="agent"';
    } else if (assassins % 2 === 1) {
      htmlClass = ' class="assassin"';
    }
    rows[i%5][Math.floor(i / 5)] = `<td${htmlClass}></td>`;
    agents >>= 1;
    assassins >>= 1;
  }

  return rows;
}

function convertRowsToHtml(rows, isRotated) {

  if (isRotated) rows = rows.reverse().map(v => v.reverse());
  
  let tRows = rows.map(row => `<tr>${row.join('')}</tr>`);
  
  let front = `<tr${isRotated ? ' style="transform: rotate(180deg);"' : ''}><td colspan="5" class="front">FRONT</td></tr>`
  
  if (isRotated) tRows.unshift(front);
  else tRows.push([front]);

  return tRows;
}

const template = (gameID, isRotated, tRows) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aliases X 2</title>
  <style>
table {
  height: 90vh;
  width: 90vw;
  max-width: 120vh;
  margin: 15px auto;
  border: 2px solid black;
  border-collapse: seperate;
  border-spacing: 4px;
}
td {
  border: 2px solid rgb(187, 187, 187);
  background: rgb(223, 220, 185);
}
.assassin {
  background: black;
}
.agent {
  background: rgb(29, 165, 72);
}
.front {
  background: white;
  color: rgb(31, 94, 31);
  border-width: 1px;
  text-align: center;
  font-size: 2rem;
  height: 2.5rem;
}
nav {
  display:flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
</head>
<body>
  <nav>
    <button id="new_game">New Game</button>
    <div id="game_id">Game ID: ${gameID}</div>
    <button id="rotate">Flip</button>
  </nav>
  <table id="game_board">
    <tbody>
    ${tRows}
    </tbody>
  </table>
</body>
<script>
  const game_state = {
    isRotated: ${isRotated}
  }

  function rotateBoard() {
    let table = document.getElementById('game_board').tBodies[0];
    
    for (let i = 4; i >= 0; i--) {
      table.append(table.rows[i])
    }
    
    document.getElementsByClassName('front')[0].style.transform = 'rotate(180deg)';
  }

  function attachListeners() {

    document.getElementById('rotate').onclick = rotateBoard;

    document.getElementById('new_game').onclick = () => {
      let gameID = Math.floor(Math.random() * 2560).toString(16);
      window.location.replace(\`/g/?gameID=\${gameID}&player=1\`);
    }
  }

  attachListeners();

</script>
</body>
</html>
`;

const renderHtml = (gameID, isRotated, agents, sass) => {
  // console.log(agents, sass)
  let rows = convertBitsToRows(agents, sass);
  // console.log(rows);
  let tRows = convertRowsToHtml(rows, isRotated);
  // console.log(tRows);
  return template(gameID, isRotated, tRows.join(''));
}

module.exports = {
  renderHtml,
}