import InputHandler from './input-handler';

describe('constructor', () => {
  test('keysDown should be an empty object', () => {
    const handler = new InputHandler();
    expect(handler.keysDown).toEqual({});
  });
});

describe('keyDown', () => {
  test("should set the keyCode's prop on keysDown to true", () => {
    const handler = new InputHandler();

    handler.keyDown({ keyCode: 32 });

    expect(handler.keysDown['32']).toBe(true);
  });
});

describe('keyUp', () => {
  test("should set the keyCode's prop on keysDown to false", () => {
    const handler = new InputHandler();

    handler.keyUp({ keyCode: 32 });

    expect(handler.keysDown['32']).toBe(false);
  });
});

describe('isKeyDown', () => {
  test('should return true if a key is down', () => {
    const handler = new InputHandler();

    handler.keyDown({ keyCode: 32 });

    expect(handler.isKeyDown(32)).toBe(true);
  });
  test('should return false if a key is not down', () => {
    const handler = new InputHandler();
    expect(handler.isKeyDown(32)).toBe(false);
  });
});
