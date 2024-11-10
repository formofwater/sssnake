'use strict';

/*
TODO:

*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let scoreBlock = document.querySelector('.score-count');
let score = 0;
// increaseScore(score);
drawScore();

const config = {
  step: 0,
  maxStep: 6,
  sizeCell: 16,
  sizeBerry: 16 / 4
}

const snake = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  // dx: config.sizeCell,
  dx: 1,
  dy: 0,
  bodyCells: [],
  maxBodyCells: 3
}

let direction = 'right';

let berry = {
  x: 100,
  y: 0,
  spawn: function() {
    // randomPositionBerry();
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, config.sizeCell, config.sizeCell);
  }
}

function drawSnake() {
  if (direction === 'right' || direction === 'down') {
    snake.x += snake.dx;
    snake.y += snake.dy;
  } else {
    snake.x -= snake.dx;
    snake.y -= snake.dy;
  }

  snake.bodyCells.unshift({ x: snake.x, y: snake.y });

  if (snake.bodyCells.length > snake.maxBodyCells) {
    snake.bodyCells.pop();
  }

  snake.bodyCells.forEach((el, idx) => {
    if (idx === 0) {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = 'blue';
    }
    ctx.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);

    if (snake.bodyCells[0].y === 0 && direction === 'up') {
      snake.y = 400;
    } else if (snake.bodyCells[0].x === 0 && direction === 'left') {
      snake.x = 320;
    } else if (snake.bodyCells[0].y === 400 && direction === 'down') {
      snake.y = 0;
    } else if (snake.bodyCells[0].x === 320 && direction === 'right') {
      snake.x = 0;
    }

    if (el.x === berry.x && el.y === berry.y) {
      snake.maxBodyCells++;
      increaseScore(score);
      randomPositionBerry();
    }

    for (let i = idx + 1; i < snake.bodyCells.length; i++) {
      refreshGame();
    }
  });
}

function refreshGame() {
  // todo
}

function randomPositionBerry() {
  berry.x = getRandomInt(0, canvas.width);
  berry.y = getRandomInt(0, canvas.height);
}

function moveSnake() {
  requestAnimationFrame(moveSnake);
  // if (++config.step < config.maxStep) {
  //   return;
  // }
  // config.step = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // drawBerry();
  berry.spawn();
  drawSnake();
}

moveSnake();

function increaseScore(score) {
  score++;
  drawScore();
}

function drawScore() {
  scoreBlock.innerHTML = score;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// canvas.addEventListener('click', () => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   console.log('click')
// });

document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyW' && direction !== 'down') {
    direction = 'up';
    snake.dx = 0;
    snake.dy = 1;
  } else if (e.code === 'KeyA' && direction !== 'right') {
    direction = 'left';
    snake.dx = 1;
    snake.dy = 0;
  } else if (e.code === 'KeyS' && direction !== 'up') {
    direction = 'down';
    snake.dx = 0;
    snake.dy = 1;
  } else if (e.code === 'KeyD' && direction !== 'left') {
    direction = 'right';
    snake.dx = 1;
    snake.dy = 0;
  }
});
