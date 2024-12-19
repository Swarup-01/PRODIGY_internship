const gameBoard = document.getElementById("gameBoard");
const gameStatus = document.getElementById("gameStatus");
const resetBtn = document.getElementById("resetBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game board
function initializeBoard() {
  gameBoard.innerHTML = "";
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  gameStatus.textContent = "Player X's Turn";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  }
}

// Handle cell clicks
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  // If cell is already filled or game is inactive, ignore the click
  if (board[index] !== "" || !gameActive) {
    return;
  }

  // Update the board and UI
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check for a winner or tie
  if (checkWinner()) {
    gameStatus.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (board.every((cell) => cell !== "")) {
    gameStatus.textContent = "It's a Tie!";
    gameActive = false;
    return;
  }

  // Switch players
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for a winner
function checkWinner() {
  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return (
      board[a] === currentPlayer &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

// Reset the game
resetBtn.addEventListener("click", initializeBoard);

// Start the game
initializeBoard();
