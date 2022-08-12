const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = (canvas.width / tileCount) - 2;

let headX = 10;
let headY = 10;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

const snakeParts = [];
let tailLength = 2;

let score = 0;

const soundGameOver = new Audio('Game_Over.mp3');
const soundScore = new Audio('Point.mp3');


// game loop
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    console.log(result);
    if (result) {
        gameOverScreen();
        soundGameOver.play();
        return;
    } else {
        clearScreen();
        checkAppleCollision();
        drawApple();
        drawSnake();
        drawScore();
        if (score > 20) {
            speed = 10;
        } else if (score > 50) {
            speed = 15;
        } else if (score > 60) {
            speed = 17;
        } else if (score > 80) {
            speed = 20;
        }
        setTimeout(() => drawGame(), 1000 / speed);
    }
}

function clearScreen() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = '#19A0A0';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    ctx.fillStyle = '#38369A';
    snakeParts.forEach((part) => ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize));
    snakeParts.push(new SnakePart(headX, headY))
    while (snakeParts.length >= tailLength) {
        snakeParts.shift();
    }

}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = '#EF8354';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if (appleX == headX && appleY == headY) {
        soundScore.play();
        moveApple();
        tailLength++;
        score += 5;
    }
}

function moveApple() {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    // up
    if (event.keyCode == 38 || event.keyCode == 87 && yVelocity != -1) {
        if (yVelocity == 1) {
            return;
        }
        yVelocity = -1;
        xVelocity = 0;
    }

    // up
    if (event.keyCode == 40 || event.keyCode == 83) {
        if (yVelocity == -1) {
            return;
        }
        yVelocity = 1;
        xVelocity = 0;
    }
    // left
    if (event.keyCode == 37 || event.keyCode == 65) {
        if (xVelocity == 1) {
            return;
        }
        yVelocity = 0;
        xVelocity = -1;
    }
    // right
    if (event.keyCode == 39 || event.keyCode == 68) {
        if (xVelocity == -1) {
            return;
        }
        yVelocity = 0;
        xVelocity = 1;
    }
}

function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '20px Verdana';
    ctx.fillText(`Score: ${score}`, (canvas.width - 110), 20);
}

function isGameOver() {
    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }
    if (headX < 0 || headX >= tileCount || headY < 0 || headY >= tileCount) {
        return true;
    }
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            return true;
        }
    }
}

function gameOverScreen() {
    ctx.fillStyle = "red";
    ctx.font = '20px Verdana';
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop('0', 'green');
    gradient.addColorStop('0.5', 'cyan');
    gradient.addColorStop('1.0', 'blue');
    ctx.fillStyle = gradient;
    ctx.fillText(`Game Over: your score is: ${score}`, (canvas.width / 6.5), (canvas.height / 2));
}

drawGame();