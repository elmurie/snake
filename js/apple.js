import { tileCount, tileSize, soundScore } from "./main.js";

import {ctx} from '/js/canvas.js';

import main from './main.js';

import { setSpeed } from "./main.js";

import parts from './snakePart.js';

export function drawApple() {
    ctx.fillStyle = '#0377fc';
    ctx.fillRect(main.appleX * tileCount, main.appleY * tileCount, tileSize, tileSize);
}

export function checkAppleCollision() {
    if (main.appleX == main.headX && main.appleY == main.headY) {
        soundScore.play();
        parts.tailLength++;
        moveApple();
        main.score += 5;
        setSpeed();
    }
}

export function moveApple() {
    main.appleX = Math.floor(Math.random() * tileCount);
    main.appleY = Math.floor(Math.random() * tileCount);
    parts.snakeParts.forEach(part => {
        if (part.x == main.appleX && part.y == main.appleY) {
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
        }
    })
}