import interval from './interval';

export function GameLoopTicker(gameObjects) {
  this.gameObjects = gameObjects;
}

GameLoopTicker.prototype.run = function run() {};

export default interval(GameLoopTicker);
