/**
 *
 * @param {Tetromino}tetromino
 */
function drawTetromino(tetromino) {
  const canvas = document.getElementById('canvasGame');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = tetromino.color;
    for (let i = 0; i < tetromino.figure.length; i += 1) {
      for (let j = 0; j < tetromino.figure.length; j += 1) {
        if (tetromino.figure[i][j] === 1) {
          ctx.fillRect(
            tetromino.coords.x * 40 + j * 40,
            tetromino.coords.y * 40 + i * 40,
            39,
            39,
          );
        }
      }
    }
  }
}
/**
 *
 * @param {Tetromino}tetromino
 */
function clearTetromino(tetromino) {
  const canvas = document.getElementById('canvasGame');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    for (let i = 0; i < tetromino.figure.length; i += 1) {
      for (let j = 0; j < tetromino.figure.length; j += 1) {
        if (tetromino.figure[i][j] === 1) {
          ctx.clearRect(
            tetromino.coords.x * 40 + j * 40,
            tetromino.coords.y * 40 + i * 40,
            39,
            39,
          );
        }
      }
    }
  }
}
/**
 *
 * @param {number} lineNumber
 */
function clearLine(lineNumber) {
  const canvas = document.getElementById('canvasGame');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    for (let i = 0; i < 10; i += 1) {
      ctx.clearRect(
        i * 40,
        lineNumber * 40,
        39,
        39,
      );
    }
    ctx.putImageData(ctx.getImageData(0, 0, 400, (lineNumber) * 40), 0, 40);
  }
}
/**
 * Очищает канвас с игрой
 */
function clearCanvas() {
  const canvas = document.getElementById('canvasGame');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/**
 * Рисует в элементе следующей тетроминошки.
 * @param {Tetromino}tetromino
 */
function drawNextTetromino(tetromino) {
  const canvas = document.getElementById('canvasNextTetromino');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = tetromino.color;
    for (let i = 0; i < tetromino.figure.length; i += 1) {
      for (let j = 0; j < tetromino.figure.length; j += 1) {
        if (tetromino.figure[i][j] === 1) {
          ctx.fillRect(
            j * 40,
            i * 40,
            39,
            39,
          );
        }
      }
    }
  }
}
export {
  drawTetromino, drawNextTetromino, clearTetromino, clearCanvas, clearLine,
};
