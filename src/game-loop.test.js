import { GameLoopTicker } from './game-loop';

describe('constructor', () => {
  test('should assign the game objects from args to prop', () => {
    const gameObjects = [];
    const gameLoop = new GameLoopTicker(gameObjects);

    expect(gameLoop.gameObjects).toBe(gameObjects);
    expect(gameLoop.gameObjects).toEqual(gameObjects);
  });
});
