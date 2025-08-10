// The playerScore starts off with a value of 0 by default.
let playerScore = 0;
// The computerScore starts off with a value of 0 by default.
let computerScore = 0;
// The currentPlayer's icon with a string value of 'X'.
let currentPlayer = 'X';
// The boolean statement of the game's fuctionality.
let gameActive = true;

// The array of how the length of the cells work in Tic Tac Toe.
const cells = Array.from({ length: 9 }, (_, i) =>
    document.getElementById(`cell-${i + 1}`)
);

// This is the functionality to reset everytime after the user or the computer wins a certain round.
function resetBoard() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
}

// This is the functionality of how the scoring would work if the user or the computer wins each round, if either one of them wins each round then either of them receive a point.
function updateScore(winner) {
    if (winner === 'X') {
        playerScore++;
        document.getElementById('playerScore').textContent = `Player (X): ${playerScore}`;
    } else if (winner === 'O') {
        computerScore++;
        document.getElementById('computerScore').textContent = `Computer Score (O): ${computerScore}`;
    }
}

// This is the functionality of how the checkWinner works depending either if the user or the computer has won each round.
function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            gameActive = false;
            updateScore(cells[a].textContent);
            setTimeout(resetBoard, 1000);
            return;
        }
    }

    // The if-statement everytime the game resets.
    if (cells.every(cell => cell.textContent)) {
        gameActive = false;
        setTimeout(resetBoard, 1000);
    }
}

// The player's move everytime the player gets a chance to select which block to occupy against their opponent.
function playersMove() {
    if (!gameActive) return;

    for (let cell of cells) {
        cell.addEventListener('click', () => {
            if (cell.textContent === '' && currentPlayer === 'X') {
                cell.textContent = 'X';
                currentPlayer = 'O';
                checkWinner();
                if (gameActive) setTimeout(computerMove, 1000);
            }
        });
    }
}

// The computer's move everytime the computer gets a chance to select which block to occupy against the player.
function computerMove() {
    if (!gameActive || currentPlayer !== 'O') return;

    const emptyCells = cells.filter(cell => cell.textContent === '');
    if (emptyCells.length === 0) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = 'O';
    currentPlayer = 'X';
    checkWinner();
}

// Initialize player move listeners
playersMove();
