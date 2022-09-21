import { TETROMINOS, TETROMINOS_COLORS } from './enums.js';
import { Tetromino } from './tetromino.js';

function getRandomInt(min, max) {
  const roundedMin = Math.ceil(min);
  const roundedMax = Math.floor(max);
  return Math.floor(Math.random() * (roundedMax - roundedMin + 1)) + roundedMin;
}

function getRandomTetromino() {
  const tetrominoIndex = Object.keys(TETROMINOS)[getRandomInt(0, 6)];
  return new Tetromino(
    TETROMINOS[tetrominoIndex],
    TETROMINOS_COLORS[tetrominoIndex],
    { x: getRandomInt(0, 6), y: 0 },
  );
}

export { getRandomInt, getRandomTetromino };
