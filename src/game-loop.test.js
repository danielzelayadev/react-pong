import { GameLoopTicker } from './game-loop';

describe('constructor', () => {
  test('should assign the game objects from args to prop', () => {
    const gameObjects = [];
    const gameLoop = new GameLoopTicker(gameObjects);

    expect(gameLoop.gameObjects).toBe(gameObjects);
    expect(gameLoop.gameObjects).toEqual(gameObjects);
  });
});

describe('runGameObjectScript', () => {
  test('given a gameObject with a script type component, it should run the script action callback of every script component it has', () => {
    const script = jest.fn();
    const obj = {
      name: 'okay',
      components: [
        {
          type: 'script',
          action: script
        },
        {
          type: 'script',
          action: script
        },
        {
          type: 'transform',
          action: script
        }
      ]
    };
    const gameLoop = new GameLoopTicker([obj]);

    gameLoop.runGameObjectScript(obj);

    expect(script).toHaveBeenCalledTimes(2);
  });
});
