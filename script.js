// ================================
// StarRush - Reaction Game
// ================================

// Game variables

let score = 0;
let time = 10;
let combo = 0;

let gameRunning = false;

let countdown;
let movement;

// Best score from browser storage

let bestScore =
    Number(localStorage.getItem("starRushBest")) || 0;


// ================================
// DOM Elements
// ================================

const gameArea = document.getElementById("gameArea");

const star = document.getElementById("star");

const scoreDisplay =
    document.getElementById("score");

const timeDisplay =
    document.getElementById("time");

const bestScoreDisplay =
    document.getElementById("bestScore");

const comboDisplay =
    document.getElementById("combo");

const startBtn =
    document.getElementById("startBtn");

const restartBtn =
    document.getElementById("restartBtn");

const message =
    document.getElementById("message");

const gameOver =
    document.getElementById("gameOver");

const finalScore =
    document.getElementById("finalScore");

const resultMessage =
    document.getElementById("resultMessage");


// Display initial best score

bestScoreDisplay.textContent = bestScore;


// ================================
// Start Game
// ================================

function startGame() {

    // Reset values

    score = 0;
    time = 10;
    combo = 0;

    gameRunning = true;

    // Update UI

    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;
    comboDisplay.textContent = "0x";

    // Hide start message

    message.style.display = "none";

    // Show star

    star.style.display = "flex";

    // Hide game over screen

    gameOver.classList.add("hidden");

    // Move star immediately

    moveStar();

    // Start star movement

    movement = setInterval(moveStar, 700);

    // Start countdown

    countdown = setInterval(() => {

        time--;

        timeDisplay.textContent = time;

        if (time <= 0) {
            endGame();
        }

    }, 1000);
}


// ================================
// Move Star
// ================================

function moveStar() {

    if (!gameRunning) return;

    const areaWidth =
        gameArea.clientWidth;

    const areaHeight =
        gameArea.clientHeight;

    const starSize =
        star.offsetWidth;

    // Keep star inside game area

    const maxX =
        areaWidth - starSize;

    const maxY =
        areaHeight - starSize;

    const x =
        Math.random() * maxX;

    const y =
        Math.random() * maxY;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
}


// ================================
// Star Click
// ================================

star.addEventListener("click", (event) => {

    if (!gameRunning) return;

    // Increase combo

    combo++;

    // Base score

    let points = 1;

    // Combo bonus

    if (combo >= 10) {
        points = 3;
    }
    else if (combo >= 5) {
        points = 2;
    }

    score += points;

    // Update score

    scoreDisplay.textContent = score;

    comboDisplay.textContent =
        `${combo}x`;

    // Create visual effects

    createClickEffect(event);

    createScorePopup(
        event,
        `+${points}`
    );

    // Move star immediately

    moveStar();
});


// ================================
// Click Effect
// ================================

function createClickEffect(event) {

    const effect =
        document.createElement("div");

    effect.className =
        "click-effect";

    effect.style.left =
        `${event.offsetX}px`;

    effect.style.top =
        `${event.offsetY}px`;

    gameArea.appendChild(effect);

    setTimeout(() => {
        effect.remove();
    }, 500);
}


// ================================
// Score Popup
// ================================

function createScorePopup(event, text) {

    const popup =
        document.createElement("div");

    popup.className =
        "score-popup";

    popup.textContent = text;

    popup.style.left =
        `${event.clientX - gameArea.getBoundingClientRect().left}px`;

    popup.style.top =
        `${event.clientY - gameArea.getBoundingClientRect().top}px`;

    gameArea.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 700);
}


// ================================
// End Game
// ================================

function endGame() {

    gameRunning = false;

    // Stop timers

    clearInterval(countdown);
    clearInterval(movement);

    // Hide star

    star.style.display = "none";

    // Show final score

    finalScore.textContent = score;

    // Check best score

    if (score > bestScore) {

        bestScore = score;

        localStorage.setItem(
            "starRushBest",
            bestScore
        );

        bestScoreDisplay.textContent =
            bestScore;

        resultMessage.textContent =
            "🔥 New high score! Amazing reaction speed.";

    }
    else if (score >= 20) {

        resultMessage.textContent =
            "⚡ Incredible! Your reactions are seriously fast.";

    }
    else if (score >= 10) {

        resultMessage.textContent =
            "👏 Great job! Try to beat your score.";

    }
    else {

        resultMessage.textContent =
            "🎯 Keep practicing. You can do better!";

    }

    // Show game over screen

    gameOver.classList.remove("hidden");
}


// ================================
// Restart
// ================================

function restartGame() {

    startGame();
}


// ================================
// Button Events
// ================================

startBtn.addEventListener(
    "click",
    startGame
);

restartBtn.addEventListener(
    "click",
    restartGame
);