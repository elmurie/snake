import parts from './snakePart.js';

import { SnakePart } from './snakePart.js';

import { ctx } from './canvas.js';

import main from './main.js';

import { tileCount, tileSize } from "./main.js";


export function drawSnake() {
    ctx.fillStyle = '#a2d000';
    ctx.fillRect(main.headX * tileCount, main.headY * tileCount, tileSize, tileSize);
    ctx.fillStyle = '#769702';
    parts.snakeParts.forEach((part) => ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize));
    parts.snakeParts.push(new SnakePart(main.headX, main.headY))
    while (parts.snakeParts.length >= parts.tailLength) {
        parts.snakeParts.shift();
    }
}

export function changeSnakePosition() {
    main.headX = main.headX + main.xVelocity;
    main.headY = main.headY + main.yVelocity;
}