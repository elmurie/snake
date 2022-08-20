import main from './main.js'

const scoreDisplay = document.getElementById('scoreDisplay');

export function drawScore() {
    scoreDisplay.innerText = `Score: ${main.score}`
}