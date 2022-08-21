import { drawScore } from './score.js';

import main from './main.js';

import { tileCount } from './main.js';

import { moveApple } from './apple.js';

import parts from './snakePart.js';

export const canvas = document.getElementById('game');
export const ctx = canvas.getContext('2d');

export function initScreen() {
    drawScore();
    ctx.globalCompositeOperation = 'source-over';
    ctx.font = '20px Silkscreen';
    ctx.fillStyle = '#fff';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`PRESS ENTER TO PLAY!`, (canvas.width / 2), (canvas.height / 2));
}

export function clearScreen() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function gameOverScreen(gameOver) {
    main.gameStarted = false;
    if (gameOver) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.font = '50px Silkscreen';
        ctx.fillStyle = '#fff';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`Game Over!`, (canvas.width / 2), (canvas.height / 2.1));
        ctx.font = '20px Roboto Mono';
        ctx.fillText(`Your score is: ${main.score}`, (canvas.width - (canvas.width / 2)), (canvas.height / 1.7));
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#fff';
        ctx.font = '20px Roboto Mono';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`PRESS ENTER TO PLAY AGAIN`, (canvas.width - (canvas.width / 2)), (canvas.height / 1.2), 400);
        setTimeout(() => gameOverScreen(), 500);
    }
}

export function isGameOver() {
    let isTouching = false;

    if (main.yVelocity === 0 && main.xVelocity === 0) {
        return false;
    }
    if (main.headX < 0 || main.headX >= tileCount || main.headY < 0 || main.headY >= tileCount) {
        isTouching = true;
    }
    parts.snakeParts.forEach(part => {
        if (part.x === main.headX && part.y === main.headY) {
            isTouching = true;
        }
    })
    if (isTouching) {
        main.soundGameOver.play();
    }
    return isTouching;
}

export function resetGame() {
    clearScreen();

    main.headX = 10;
    main.headY = 10;

    moveApple();
    main.xVelocity = 0;

    main.yVelocity = 0;
    parts.snakeParts.splice(0, parts.snakeParts.length);
    parts.tailLength = 2;
    main.score = 0;
    main.gameOver = false;
}