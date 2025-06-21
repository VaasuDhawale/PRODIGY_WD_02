const gameContainer = document.getElementById("game");
const statusText = document.getElementById("status");
let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

function createBoard() {
  board.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleClick);
    gameContainer.appendChild(cell);
  });
}

function handleClick(e) {
  const index = e.target.getAttribute("data-index");
  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameOver = true;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw! 🤝";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winConditions.some(combination => {
    const [a,b,c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = Array(9).fill("");
  gameOver = false;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
  gameContainer.innerHTML = "";
  createBoard();
}

createBoard();
