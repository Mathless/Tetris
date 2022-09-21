class Tetromino {
  figure;

  coords;

  color;

  /**
   * @param {*} figure
   * @param {*} color
   * @param {{x: number, y: number}} coords
   */
  constructor(figure, color, coords) {
    this.figure = figure;
    this.color = color;
    this.coords = coords;
  }
}
export { Tetromino };
