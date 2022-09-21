import {
  clearCanvas, clearLine, clearTetromino, drawNextTetromino, drawTetromino,
} from './canvas.js';
import { getRandomTetromino } from './utils.js';
import { scoreTable } from './score-table.js';

class Game {
  tetrominoCollisionFlag;

  field;

  nextTetromino;

  currentTetromino;

  score;

  streak;

  gameIntervalId;

  gameIsRunning;

  level;

  intervalSpeed;

  moveDown() {
    if (!this.gameIsRunning) return;
    if (!this.checkForCollision()) {
      this.processCollision();
    }
    clearTetromino(this.currentTetromino);
    this.currentTetromino.coords.y += 1;
    drawTetromino(this.currentTetromino);
    if (!this.checkForCollision()) {
      this.processCollision();
    }
  }

  start() {
    this.tetrominoCollisionFlag = false;
    this.score = 0;
    this.streak = 0;
    this.currentTetromino = getRandomTetromino();
    this.nextTetromino = getRandomTetromino();
    drawNextTetromino(this.nextTetromino);
    this.field = new Array(20);
    this.level = 1;
    this.intervalSpeed = 1000;
    document.getElementById('current-score').innerHTML = `Your score: ${this.score.toString()}`;
    for (let i = 0; i < 20; i += 1) {
      this.field[i] = new Array(10);
      for (let j = 0; j < 10; j += 1) {
        this.field[i][j] = 0;
      }
    }
    clearInterval(this.gameIntervalId);
    clearCanvas();
    this.gameIsRunning = true;

    this.gameIntervalId = setInterval((((self) => () => {
      self.moveDown();
    })(this)), this.intervalSpeed);
  }

  checkForCollision() {
    return this.isValidPositionOfMatrix(
      this.currentTetromino.figure,
      this.currentTetromino.coords.x,
      this.currentTetromino.coords.y + 1,
    );
  }

  processCollision() {
    this.tetrominoCollisionFlag = true;
    if (this.currentTetromino.coords.y === 0) {
      this.endGame();
    }
    this.saveTetrominoOnField();
    this.currentTetromino = this.nextTetromino;
    this.nextTetromino = getRandomTetromino();
    drawNextTetromino(this.nextTetromino);
    this.streak = 1;
    this.checkForFullLines();
  }

  saveTetrominoOnField() {
    for (let i = 0; i < this.currentTetromino.figure.length; i += 1) {
      for (let j = 0; j < this.currentTetromino.figure.length; j += 1) {
        if (this.currentTetromino.figure[i][j] === 1) {
          this.field[i + this.currentTetromino.coords.y][j + this.currentTetromino.coords.x] = 1;
        }
      }
    }
  }

  isValidPositionOfMatrix(matrix, x, y) {
    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix.length; j += 1) {
        if (matrix[i][j]
            && (i + y < 0
            || j + x < 0
            || j + x >= 10
                || i + y >= 20
            || this.field[y + i][x + j])) return false;
      }
    }
    return true;
  }

  keyRight() {
    if (this.isValidPositionOfMatrix(
      this.currentTetromino.figure,
      this.currentTetromino.coords.x + 1,
      this.currentTetromino.coords.y,
    )) {
      clearTetromino(this.currentTetromino);
      this.currentTetromino.coords.x += 1;
      drawTetromino(this.currentTetromino);

      if (!this.checkForCollision()) {
        this.processCollision();
      }
      drawTetromino(this.currentTetromino);
    }
  }

  keyLeft() {
    if (this.isValidPositionOfMatrix(
      this.currentTetromino.figure,
      this.currentTetromino.coords.x - 1,
      this.currentTetromino.coords.y,
    )) {
      clearTetromino(this.currentTetromino);
      this.currentTetromino.coords.x -= 1;
      drawTetromino(this.currentTetromino);

      if (!this.checkForCollision()) {
        this.processCollision();
      }
    }
  }

  keyUp() {
    const turnedMatrix = this.getMatrixOfTurnedCurrentTetromino();
    if (this.isValidPositionOfMatrix(
      turnedMatrix,
      this.currentTetromino.coords.x,
      this.currentTetromino.coords.y,
    )) {
      clearTetromino(this.currentTetromino);
      this.currentTetromino.figure = turnedMatrix;
      drawTetromino(this.currentTetromino);

      if (!this.checkForCollision()) {
        this.processCollision();
      }
    }
  }

  keyDown() {
    if (this.gameIsRunning) {
      while (!this.tetrominoCollisionFlag) {
        this.moveDown();
      }
      this.tetrominoCollisionFlag = false;
    }
  }

  getMatrixOfTurnedCurrentTetromino() {
    const matrix = new Array(this.currentTetromino.figure.length);
    for (let i = 0; i < this.currentTetromino.figure.length; i += 1) {
      matrix[i] = new Array(this.currentTetromino.figure.length).fill(0);
      for (let j = 0; j < this.currentTetromino.figure.length; j += 1) {
        matrix[i][j] = this.currentTetromino.figure[this.currentTetromino.figure.length - j - 1][i];
      }
    }
    return matrix;
  }

  checkForFullLines() {
    let counter = 0;
    for (let i = 0; i < 20; i += 1) {
      let fullLine = true;
      for (let j = 0; j < 10; j += 1) {
        if (this.field[i][j] === 0) {
          fullLine = false;
          break;
        }
      }
      if (fullLine) counter += 1;
      if (fullLine && counter >= 2) {
        this.score += 100 * this.streak;
        this.streak += 1;
        document.getElementById('current-score').innerHTML = `Your score: ${this.score.toString()}`;
        if (this.level < Math.floor(this.score / 1000) && this.level < 8) {
          this.increaseLevel();
        }
        this.deleteLine(i);
        clearLine(i);
        this.checkForFullLines();
      }
    }
  }

  increaseLevel() {
    this.level += 1;
    clearInterval(this.gameIntervalId);
    this.gameIntervalId = setInterval((((self) => () => {
      self.moveDown();
    })(this)), this.intervalSpeed -= 100);
    document.getElementById('current-level').innerHTML = `Level: ${this.level.toString()}`;
  }

  deleteLine(lineNumber) {
    if (lineNumber === 0) {
      this.field[0].fill(0);
    }
    for (let i = lineNumber; i > 0; i -= 1) {
      for (let j = 0; j < 10; j += 1) {
        this.field[i][j] = this.field[i - 1][j];
      }
    }
  }

  endGame() {
    clearInterval(this.gameIntervalId);
    this.gameIsRunning = false;
    const { username } = localStorage;
    const scores = new Map(JSON.parse(localStorage.scores ?? '[]'));
    if ((scores.get(username) ?? 0) <= this.score) { scores.set(username, this.score); }

    alert(`Your score: ${this.score}!`);
    localStorage.setItem('scores', JSON.stringify(Array.from(scores.entries())));
    scoreTable();
  }
}
export { Game };
