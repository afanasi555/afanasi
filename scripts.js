let moves = 20;
let coins = 0;
let currentLevel = 1;
let tasks = [{emoji: "🍓", count: 3}];  // Список задач для текущего уровня

function startGame() {
    alert('Игра началась!');
    generateBoard();
}

function pauseGame() {
    alert('Игра на паузе.');
}

function resetGame() {
    alert('Игра перезапущена!');
    generateBoard();
}

function undoMove() {
    alert('Ход отменен.');
}

function openShop() {
    document.querySelector('.shop').style.display = 'block';
}

function selectLevel(level) {
    if (level > currentLevel) {
        alert('Этот уровень пока заблокирован.');
        return;
    }
    currentLevel = level;
    alert(`Вы выбрали уровень ${level}`);
    // Логика загрузки уровня
    loadLevel(level);
}

function loadLevel(level) {
    moves = 20 + level * 5;  // Пример увеличения шагов с каждым уровнем
    tasks = generateTasksForLevel(level);  // Генерация задач
    updateTaskList();
    generateBoard();  // Генерация игрового поля
}

function generateTasksForLevel(level) {
    let taskList = [];
    if (level >= 5) {
        // С 5 уровня добавляются несколько задач
        taskList.push({emoji: "🍓", count: 5});
        taskList.push({emoji: "🍒", count: 4});
    } else {
        taskList.push({emoji: "🍓", count: 3 + level});
    }
    return taskList;
}

function updateTaskList() {
    let taskListDiv = document.getElementById("task-list");
    taskListDiv.innerHTML = "";
    tasks.forEach((task, index) => {
        taskListDiv.innerHTML += `<p class="task-item">Задача ${index + 1}: Собрать ${task.count} ${task.emoji}</p>`;
    });
}

function generateBoard() {
    let board = document.querySelector('.game-board');
    board.innerHTML = "";  // Очищаем поле
    for (let i = 0; i < 64; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = getRandomEmoji();  // Генерация случайного объекта
        board.appendChild(cell);
    }
}

function getRandomEmoji() {
    const emojis = ["⭐", "✨", "💦", "🔥", "🎉", "❤️", "🍓", "🍒", "🍉", "🍕", "🐱", "🐯"];
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function buyBomb() {
    if (coins >= 40) {
        coins -= 40;
        alert('Бомба куплена!');
    } else {
        alert('Недостаточно монет.');
    }
    updateCoins();
}

function buyMove() {
    if (coins >= 1) {
        coins -= 1;
        moves += 1;
        updateMoves();
    } else {
        alert('Недостаточно монет.');
    }
}

function updateCoins() {
    document.getElementById("coins").textContent = coins;
}

function updateMoves() {
    document.getElementById("moves").textContent = moves;
}

function checkMatch() {
    // Логика проверки совпадений и удаления 3 в ряд
}

function bombExplosion() {
    // Логика взрыва бомбы и подсчета результатов
}

function generateLevel(level) {
    // Генерация уровней в зависимости от номера
}
