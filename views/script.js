module.exports = (isRotated) => `

(() => {
  document.getElementById('join_game').onclick = () => {
    let gameID = window.prompt('Game code:');
    window.location.replace(\`/g/\${gameID}/2\`);
  }

  document.getElementById('new_game').onclick = () => {
    let gameID = Math.floor(Math.random() * 2560);
    window.location.replace(\`/g/\${gameID}/1\`);
  }
})();
`;
