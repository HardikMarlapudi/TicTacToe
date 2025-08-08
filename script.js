let playerScore = 0;
let computerScore = 0;
let currentPlayer = 'X';
let computer = '0';
let gameActive = true;

const cells = Array.from({ length: 9 }, (_, i) =>
    document.getElementById(`cell-${i + 1}`)
);

function resetBoard() {
    cells.forEach(cell => cell.textContent = '');
    gameActive = true;
    currentPlayer = 'X';
}

function updateScore(winner) {
    if (winner === 'X') {
        playerScore++;
        document.getElementById("playerScore").textContent = `Player (X): ${playerScore}`;
    } else if (winner === 'O') {
        computerScore++;
        document.getElementById("computerScore").textContent = `Computer Score (O): ${computerScore}`;
    }
}

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

    if (cells.every(cell => cell.textContent)) {
        gameActive = false;
        setTimeout(resetBoard, 1000);
    }
}

function playersMove() {
    if (!gameActive) return;

    for (let cell of cells) {
        cell.addEventListener('click', () => {
            if (cell.textContent === '' && currentPlayer === 'X') {
                cell.textContent = 'X';
                currentPlayer = 'O';
                checkWinner();
                if (gameActive) setTimeout(computerMove, 500);
            }
        });
    }
}

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
