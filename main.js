'use strict';

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
  x: 0,
  y: 0,
  // dx: config.sizeCell,
  dx: 1,
  dy: 0,
  bodyCells: [],
  maxBodyCells: 3
}

let berry = {
  x: 100,
  y: 0,
  spawn: function() {
    ctx.fillStyle = 'red';
    // this.x = getRandomInt(0, canvas.width);
    // this.y = getRandomInt(0, canvas.height);

    ctx.fillRect(this.x, this.y, config.sizeCell, config.sizeCell);
  }
}

let direction = 'right';

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

    if (snake.bodyCells[0].x === 320 && snake.bodyCells[1].x === 319) {
      snake.x = 0;
    }
    else if (snake.bodyCells[0].y === 1 && snake.bodyCells[1].y === 2) { // 0 1 TypeError: Cannot read properties of undefined (reading 'y')
      snake.y = 400;
    }
    else if (snake.bodyCells[0].y === 400 && snake.bodyCells[1].y === 399) {
      snake.y = 0;
    }
    else if (snake.bodyCells[0].x === 0 && snake.bodyCells[1].x === 1) {
      snake.x = 320;
    }


    // if (snake.bodyCells[0].x > snake.bodyCells[1].x) {
    //   direction = 'right';
    // }

    // if (el.x === berry.x && el.y === berry.y) {
    //   snake.maxBodyCells++;
    //   increaseScore(score);
    //   randomPositionBerry();
    // }

    for (let i = idx + 1; i < snake.bodyCells.length; i++) {
      refreshGame();
    }
  });
}

function refreshGame() {
  // todo
}

function randomPositionBerry() {
  // todo
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
