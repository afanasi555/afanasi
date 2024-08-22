let moves = 20;
let coins = 0;
let currentLevel = 1;
let tasks = [{ emoji: "🍓", count: 3 }]; // Список задач для текущего уровня
let selectedCell = null; // Переменная для хранения выбранной ячейки
let inventory = []; // Инвентарь для хранения купленных бомб

// Функция начала игры
function startGame() {
    alert('Игра началась!');
    generateBoard();
    updateMoves();
}

// Функция паузы игры
function pauseGame() {
    alert('Игра на паузе.');
}

// Функция сброса игры
function resetGame() {
    alert('Игра перезапущена!');
    generateBoard();
    updateMoves();
}

// Функция отмены хода
function undoMove() {
    alert('Ход отменен.');
}

// Функции для управления окнами
function openShop() {
    document.querySelector('.shop').style.display = 'block';
}

function closeShop() {
    document.querySelector('.shop').style.display = 'none';
}

function openInventory() {
    document.querySelector('.inventory').style.display = 'block';
    updateInventory();
}

function closeInventory() {
    document.querySelector('.inventory').style.display = 'none';
}

function openStats() {
    let statsString = "Статистика игроков:\n";
    // Здесь можно добавить реальную статистику
    document.getElementById('stats-content').textContent = statsString;
    document.querySelector('.stats').style.display = 'block';
}

function closeStats() {
    document.querySelector('.stats').style.display = 'none';
}

// Функция выбора уровня
function selectLevel(level) {
    if (level > currentLevel) {
        alert('Этот уровень пока заблокирован.');
        return;
    }
    currentLevel = level;
    alert(`Вы выбрали уровень ${level}`);
    loadLevel(level);
}

// Функция загрузки уровня
function loadLevel(level) {
    moves = 20 + level * 5;  // Пример увеличения шагов с каждым уровнем
    tasks = generateTasksForLevel(level);  // Генерация задач
    updateTaskList();
    generateBoard();  // Генерация игрового поля
    updateMoves();
}

// Функция генерации задач для уровня
function generateTasksForLevel(level) {
    let taskList = [];
    if (level >= 5) {
        taskList.push({ emoji: "🍓", count: 5 });
        taskList.push({ emoji: "🍒", count: 4 });
    } else {
        taskList.push({ emoji: "🍓", count: 3 + level });
    }
    return taskList;
}

// Функция обновления списка задач
function updateTaskList() {
    let taskListDiv = document.getElementById("task-list");
    taskListDiv.innerHTML = "";
    tasks.forEach((task, index) => {
        taskListDiv.innerHTML += `<p class="task-item">Задача ${index + 1}: Собрать ${task.count} ${task.emoji}</p>`;
    });
}

// Функция генерации игрового поля
function generateBoard() {
    let board = document.querySelector('.game-board');
    board.innerHTML = "";  // Очищаем поле
    for (let i = 0; i < 64; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = getRandomEmoji();  // Генерация случайного объекта
        cell.addEventListener('click', () => selectCell(cell, i));  // Добавляем обработчик события для клика
        board.appendChild(cell);
    }
    // Запускаем проверку совпадений после генерации поля
    setTimeout(() => {
        checkMatches();  // Проверка на совпадения
        refillBoard();  // Заполнение пустых мест новыми объектами
    }, 500);
}

// Функция получения случайного объекта
function getRandomEmoji() {
    const emojis = ["⭐", "✨", "💦", "🔥", "🎉", "❤️", "🍓", "🍒", "🍉", "🍕", "🐱", "🐯"];
    return emojis[Math.floor(Math.random() * emojis.length)];
}

// Функция выбора ячейки
function selectCell(cell, index) {
    if (selectedCell === null) {
        selectedCell = { element: cell, index: index };
        cell.style.border = '2px solid red';  // Выделяем выбранную ячейку
    } else {
        // Проверяем, можно ли поменять местами с выбранной ячейкой
        if (isAdjacent(selectedCell.index, index)) {
            swapCells(selectedCell.element, cell);  // Меняем местами ячейки
            moves--;
            updateMoves();
            // Проверяем на совпадения после каждого хода
            setTimeout(() => {
                checkMatches();  // Проверка на совпадения
                refillBoard();  // Заполнение пустых мест новыми объектами
            }, 500);
        }
        selectedCell.element.style.border = '1px solid #ccc';  // Убираем выделение
        selectedCell = null;  // Сбрасываем выбранную ячейку
    }
}

// Функция проверки соседних ячеек
function isAdjacent(index1, index2) {
    const row1 = Math.floor(index1 / 8);
    const col1 = index1 % 8;
    const row2 = Math.floor(index2 / 8);
    const col2 = index2 % 8;
    return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
}

// Функция обмена местами ячеек
function swapCells(cell1, cell2) {
    const temp = cell1.textContent;
    cell1.textContent = cell2.textContent;
    cell2.textContent = temp;
}

// Функция проверки совпадений
function checkMatches() {
    let board = document.querySelectorAll('.cell');
    let matchedCells = [];
    let toCheck = [];
    let index;

    // Проверка горизонтальных и вертикальных совпадений
    for (let i = 0; i < 64; i++) {
        const row = Math.floor(i / 8);

        // Проверка горизонтальных совпадений
        if (i % 8 <= 5 &&
            board[i].textContent === board[i + 1].textContent &&
            board[i].textContent === board[i + 2].textContent &&
            board[i].textContent === board[i + 3].textContent) {
            matchedCells.push(i, i + 1, i + 2, i + 3);  // Горизонтальное совпадение
        }

        // Проверка вертикальных совпадений
        if (row <= 4 &&
            board[i].textContent === board[i + 8].textContent &&
            board[i].textContent === board[i + 16].textContent &&
            board[i].textContent === board[i + 24].textContent) {
            matchedCells.push(i, i + 8, i + 16, i + 24);  // Вертикальное совпадение
        }
    }

    if (matchedCells.length > 0) {
        matchedCells = [...new Set(matchedCells)]; // Удаляем дубликаты
        matchedCells.forEach(index => {
            board[index].textContent = "";  // Очищаем совпавшие ячейки
        });
        setTimeout(() => {
            refillBoard();  // Заполняем пустые места новыми объектами
            checkMatches();  // Проверяем совпадения после заполнения поля
        }, 500);
        // Проверяем задачи
        checkTasks();
    }
}

// Функция создания бомбы
function createBomb(index) {
    let board = document.querySelectorAll('.cell');
    board[index].textContent = "💣";  // Устанавливаем бомбу на место совпадения
}

// Функция заполнения пустых ячеек новыми объектами
function refillBoard() {
    let board = document.querySelectorAll('.cell');
    for (let i = 0; i < board.length; i++) {
        if (board[i].textContent === "") {
            board[i].textContent = getRandomEmoji();  // Заполняем пустые места новыми объектами
        }
    }
}

// Функция проверки задач
function checkTasks() {
    tasks.forEach(task => {
        let count = 0;
        document.querySelectorAll('.cell').forEach(cell => {
            if (cell.textContent === task.emoji) {
                count++;
            }
        });
        task.count -= count;
        if (task.count <= 0) {
            alert('Задача выполнена!');
            tasks = tasks.filter(t => t !== task);  // Удаляем выполненную задачу
            updateTaskList();
        }
    });
}

// Функция покупки бомбы
function buyBomb() {
    if (coins >= 40) {
        coins -= 40;
        inventory.push('💣');  // Добавляем бомбу в инвентарь
        alert('Бомба куплена и добавлена в инвентарь!');
        updateInventory();
    } else {
        alert('Недостаточно монет.');
    }
    updateCoins();
}

// Функция покупки хода
function buyMove() {
    if (coins >= 1) {
        coins -= 1;
        moves += 1;
        updateMoves();
    } else {
        alert('Недостаточно монет.');
    }
}

// Функция обновления количества монет
function updateCoins() {
    document.getElementById("coins").textContent = `Монеты: ${coins}`;
}

// Функция обновления количества ходов
function updateMoves() {
    document.getElementById("moves").textContent = `Ходов: ${moves}`;
}

// Функция обновления инвентаря
function updateInventory() {
    document.getElementById('inventory-content').textContent = inventory.join(', ');
}

// Инициализация игры при загрузке страницы
window.onload = function() {
    startGame();
};
