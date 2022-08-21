import { canvas, initScreen, clearScreen, gameOverScreen, isGameOver } from './canvas.js';

import { drawScore } from './score.js';

import { drawApple, checkAppleCollision } from './apple.js';

import {drawSnake, changeSnakePosition} from './snake.js';

import { keyDown } from './keyEvents.js';

export let tileCount = 20;
export let tileSize = (canvas.width / tileCount) - 2;

let gameStarted = false;
let yVelocity = 0;
let xVelocity = 0;
let headX = 10;
let headY = 10;
let speed = 7;

export const soundGameOver = new Audio('Game_Over.mp3');
export const soundScore = new Audio('Point.mp3');

let gameOver = false;

// we need this to load the font
const myFont = new FontFace('Silkscreen', 'url(fonts/Silkscreen/Silkscreen-Regular.ttf)');
myFont.load().then(function (font) {

    // with canvas, if this is ommited won't work
    document.fonts.add(font);
    // get canvas context
    initScreen();
});
// game loop

export function drawGame() {
    changeSnakePosition();
    gameOver = isGameOver();
    if (gameOver) {
        gameOverScreen(gameOver);
        speed = 7;
    } else {
        gameStarted = true;
        clearScreen();
        checkAppleCollision();
        drawApple();
        drawSnake();
        drawScore();
        setTimeout(() => drawGame(), 1000 / speed);
    }
}

document.body.addEventListener('keydown', keyDown);

export function setSpeed() {
    speed += 0.20;
}

export default {
    xVelocity : 0,
    yVelocity : 0,
    speed : 7,
    headX: 10,
    headY: 10,
    appleX: 5,
    appleY: 5,
    score: 0,
    gameStarted : false,
    gameOver,
    soundGameOver,
    soundScore
}