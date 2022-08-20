import main from './main.js';

import { resetGame } from './canvas.js';

import { drawGame } from './main.js';

export function keyDown(event) {
    // up
    if (event.keyCode == 38 || event.keyCode == 87 && main.yVelocity != -1) {
        if (main.yVelocity == 1) return;

        main.yVelocity = -1;
        main.xVelocity = 0;
    }

    // up
    if (event.keyCode == 40 || event.keyCode == 83) {
        if (main.yVelocity == -1) return;

        main.yVelocity = 1;
        main.xVelocity = 0;
    }
    // left
    if (event.keyCode == 37 || event.keyCode == 65) {
        if (main.xVelocity == 1) return;

        main.yVelocity = 0;
        main.xVelocity = -1;
    }
    // right
    if (event.keyCode == 39 || event.keyCode == 68) {
        if (main.xVelocity == -1) return;
        main.yVelocity = 0;
        main.xVelocity = 1;
    }

    if (event.keyCode == 13) {
        if (!main.gameStarted) {
            resetGame();
            drawGame();
            main.gameStarted = true;
            main.gameOver = false;
        }
    }
}