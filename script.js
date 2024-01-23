document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = [];
    let currentPlayer = 'X';
    let winner = null;
  
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', handleCellClick);
      cells.push(cell);
      board.appendChild(cell);
    }
  
    function handleCellClick(event) {
      const clickedCell = event.target;
      const index = clickedCell.dataset.index;
  
      if (cells[index].textContent === '' && !winner) {
        cells[index].textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  
    function checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent !== '' && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
          winner = cells[a].textContent;
          displayWinner();
          return;
        }
      }
  
      if (cells.every(cell => cell.textContent !== '')) {
        winner = 'Draw';
        displayWinner();
      }
    }
  
    function displayWinner() {
      const message = document.createElement('div');
      message.classList.add('message');
      if (winner === 'Draw') {
        message.textContent = 'It\'s a draw!';
      } else {
        message.textContent = `Player ${winner} wins!`;
      }
      board.appendChild(message);
    }
  });
  