import interval from './interval';

export function GameLoopTicker(gameObjects) {
  this.gameObjects = gameObjects;
}

GameLoopTicker.prototype.runGameObjectScript = function runGameObjectScript(
  gameObject
) {
  gameObject.components
    .filter(({ type }) => type === 'script')
    .forEach(({ action }) => action());
};

export default interval(GameLoopTicker);
