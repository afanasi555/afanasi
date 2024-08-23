const emojis = ['⭐', '✨', '💦', '🔥', '🎉', '❤️', '🧡', '💛', '💚', '🩵', '💙', '💜', '🤎', '🖤', '🩶', '💅', '🌹', '🌸', '🌱', '🌳', '🍀', '🌲', '⛄', '☃️', '🌝', '🌚', '🌕', '🐱', '🐯', '🦁', '🦄', '🐸', '🐘', '🐣', '🐟', '🐠', '🐡', '🪼', '🐞', '🐝', '🍓', '🍒', '🍎', '🍉', '🍌', '🍍', '🍇', '🍔', '🥨', '🍟', '🍕', '🥗', '🍭', '🍬', '🍫', '🍪', '🍯', '🥤', '🎀', '🎁', '🎈', '🎊', '🎉', '🧨', '⚽', '🏀', '🧶', '📀', '💿', '💸', '👠', '⚜️', '🔱', '☢️', '☣️'];
const bombEmoji = '💣';
const explosionEmoji = '💥';

let currentLevel = 1;
let board = [];
let task = {};
let movesLeft = 30;
let score = 0;
let previousBoard = [];

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', restartLevel);
document.getElementById('undoButton').addEventListener('click', undoMove);

function startGame() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'flex';
    loadLevel(currentLevel);
}

function loadLevel(level) {
    generateBoard();
    updateTask();
    renderBoard();
    document.getElementById('currentLevel').textContent = level;
    document.getElementById('movesLeft').textContent = movesLeft;
}

function generateBoard() {
    board = Array(8).fill(null).map(() => Array(8).fill(null).map(() => generateEmoji()));
    previousBoard = JSON.parse(JSON.stringify(board)); // Сохраняем состояние для отмены хода
}

function generateEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.textContent = board[row][col];
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (isValidMove(row, col)) {
        makeMove(row, col);
        checkMatches();
        updateBoard();
        movesLeft--;
        document.getElementById('movesLeft').textContent = movesLeft;
        if (movesLeft <= 0) {
            alert('Вы проиграли! Попробуйте заново.');
            restartLevel();
        }
    }
}

function isValidMove(row, col) {
    // Проверяем, можно ли сделать ход (например, если рядом есть аналогичные объекты)
    // Пример проверки:
    return true; // Простая проверка для примера
}

function makeMove(row, col) {
    previousBoard = JSON.parse(JSON.stringify(board)); // Сохраняем состояние для отмены хода

    // Логика перемещения объекта (например, меняем местами с соседним объектом)
    // Пример:
    // let temp = board[row][col];
    // board[row][col] = board[row][col + 1];
    // board[row][col + 1] = temp;
}

function undoMove() {
    if (previousBoard.length) {
        board = JSON.parse(JSON.stringify(previousBoard));
        renderBoard();
        movesLeft++;
        document.getElementById('movesLeft').textContent = movesLeft;
    }
}

function updateTask() {
    task = {
        type: 'collect',
        target: emojis[Math.floor(Math.random() * emojis.length)],
        amount: 10 + currentLevel
    };
    document.getElementById('task').textContent = `Соберите ${task.amount} ${task.target}`;
}

function checkMatches() {
    // Логика проверки наличия трёх и более одинаковых объектов
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (board[row][col] === task.target) {
                // Проверяем, есть ли 3 и более одинаковых подряд
                // Если да, удаляем их и обновляем задание
            }
        }
    }
}

function updateBoard() {
    // Логика обновления доски после выполнения действий
    renderBoard();
}

function createBomb(row, col) {
    board[row][col] = bombEmoji;
}

function explodeBomb(row, col) {
    // Логика взрыва бомбы (например, удаление объектов в зоне 4х4)
    for (let r = row - 2; r <= row + 2; r++) {
        for (let c = col - 2; c <= col + 2; c++) {
            if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] !== bombEmoji) {
                board[r][c] = generateEmoji(); // Заменяем на новый случайный объект
            }
        }
    }
    renderBoard();
}

function restartLevel() {
    movesLeft = 30;
    loadLevel(currentLevel);
}
