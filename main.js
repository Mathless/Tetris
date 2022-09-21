import { Game } from './game.js';

let game;

function createGame() {
  if (game === undefined) {
    game = new Game();
    document.addEventListener('keydown', (event) => {
      const leftHandler = () => { game.keyLeft(); };
      const rightHandler = () => { game.keyRight(); };
      const downHandler = () => { event.preventDefault(); game.keyDown(); };
      const upHandler = () => { event.preventDefault(); game.keyUp(); };

      const callback = {
        ArrowLeft: leftHandler,
        ArrowRight: rightHandler,
        ArrowUp: upHandler,
        ArrowDown: downHandler,
      }[event.key];
      callback?.();
    });
  }
  game.start();
}
export { createGame };
