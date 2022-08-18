const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

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
    console.log(result)
    if (result) {
        gameOverScreen();
    } else {
        clearScreen();
        checkAppleCollision();
        drawApple();
        drawSnake();
        drawScore();
        setTimeout(() => drawGame(), 1000 / speed);
    }
}

function clearScreen() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = '#a2d000';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    ctx.fillStyle = '#769702';
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
    ctx.fillStyle = '#0377fc';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if (appleX == headX && appleY == headY) {
        soundScore.play();
        tailLength++;
        moveApple();
        score += 5;
        setSpeed();
    }
}

function moveApple() {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    snakeParts.forEach(part => {
        if (part.x == appleX && part.y == appleY) {
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
        }
    })
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    // up
    if (event.keyCode == 38 || event.keyCode == 87 && yVelocity != -1) {
        if (yVelocity == 1) return;

        yVelocity = -1;
        xVelocity = 0;
    }

    // up
    if (event.keyCode == 40 || event.keyCode == 83) {
        if (yVelocity == -1) return;

        yVelocity = 1;
        xVelocity = 0;
    }
    // left
    if (event.keyCode == 37 || event.keyCode == 65) {
        if (xVelocity == 1) return;

        yVelocity = 0;
        xVelocity = -1;
    }
    // right
    if (event.keyCode == 39 || event.keyCode == 68) {
        if (xVelocity == -1) return;
        yVelocity = 0;
        xVelocity = 1;
    }

    if (event.keyCode == 13) {
        idle = false;
    }
}

function drawScore() {
    scoreDisplay.innerText = `Score: ${score}`
}

function setSpeed() {
    speed += 0.20;
}

function isGameOver() {
    let gameOver = false;

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }
    if (headX < 0 || headX >= tileCount || headY < 0 || headY >= tileCount) {
        gameOver = true;
    }
    snakeParts.forEach(part => {
        if (part.x === headX && part.y === headY) {
            gameOver = true;
        }
    })
    if (gameOver) {
        soundGameOver.play();
    }
    return gameOver;
}

let blinking = true;
function gameOverScreen() {
    let idle = true;
    if (idle) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.font = '50px Silkscreen';
        ctx.fillStyle = '#fff';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`Game Over!`, (canvas.width / 2), (canvas.height / 2.1));
        ctx.font = '20px Roboto Mono';
        ctx.fillText(`Your score is: ${score}`, (canvas.width - (canvas.width / 2)), (canvas.height / 1.7));
        if (blinking) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#fff';
            ctx.font = '20px Roboto Mono';
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`PRESS ENTER TO PLAY AGAIN`, (canvas.width - (canvas.width / 2)), (canvas.height / 1.2), 400);
        } else {
            ctx.globalCompositeOperation = 'destination-over';
            ctx.clearRect(1 * tileCount, 15 * tileCount, canvas.width - (2 * tileCount), 50);
        }
        blinking = blinking !== true;
        console.log("blinking", blinking);
        setTimeout(() => gameOverScreen(), 500);
    } else {
        drawGame();
    }
}

drawGame();