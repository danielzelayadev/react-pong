import interval from './interval';

beforeEach(() => {
  jest.clearAllMocks();
});

test('given a "ticker" class, should return a decorated interval class', () => {
  const actual = interval(function Ticker() {
    this.run = jest.fn();
  });

  expect(typeof actual).toBe('function');
});

test('should throw error if "Ticker" param is not a function', () => {
  expect(interval.bind(null, 5)).toThrowError(
    'Must provide a function prototype or class'
  );
});

describe('decorated interval class', () => {
  test('should instantiate the "ticker" class and pass the extra args to the ticker instance', () => {
    const Ticker = jest.fn(function t() {
      this.run = jest.fn();
    });
    const DecoratedTicker = interval(Ticker);
    const extraArgs = [10, 'yes', { id: 10 }];
    (() => new DecoratedTicker(100, ...extraArgs))();

    expect(Ticker).toHaveBeenCalledTimes(1);
    expect(Ticker).toHaveBeenCalledWith(...extraArgs);
  });
  test('should throw error if the "ticker" class instance has no run function', () => {
    const testCases = [
      () => {},
      function t() {
        this.run = 10;
      },
      function t() {
        this.x = 100;
      }
    ];
    testCases.forEach(testCase => {
      const DecoratedTicker = interval(testCase);
      expect(() => new DecoratedTicker(100)).toThrowError(
        'Must provide a function prototype/class with a `run` callback'
      );
    });
  });
  test('should throw error if ms is not a number type', () => {
    const Ticker = function Ticker() {
      this.run = jest.fn();
    };
    const DecoratedInterval = interval(Ticker);
    const testCases = [{}, undefined, 'yes', [], f => f];

    testCases.forEach(testCase => {
      expect(() => new DecoratedInterval(testCase)).toThrowError(
        `First argument "ms" must be a number. Got: ${testCase} of type ${typeof testCase}`
      );
    });
  });
  test('should throw error if ms is a negative number', () => {
    const Ticker = function Ticker() {
      this.run = jest.fn();
    };
    const DecoratedInterval = interval(Ticker);
    expect(() => new DecoratedInterval(-100)).toThrowError(
      'ms must be a positive number'
    );
  });
  test('should have a start and end function', () => {
    const DecoratedInterval = interval(function Ticker() {
      this.run = jest.fn();
    });
    const instance = new DecoratedInterval(100);

    expect(typeof instance.start).toBe('function');
    expect(typeof instance.end).toBe('function');
  });
  describe('start', () => {
    test("should call setInterval exactly 1 time with the provided ms and the child interval's run callback", () => {
      const run = jest.fn();
      const ms = 100;
      const Ticker = function Ticker() {
        this.run = run;
      };
      const DecoratedInterval = interval(Ticker);
      const instance = new DecoratedInterval(ms);

      instance.start();

      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenCalledWith(run, ms);
    });
    test('should not call setInterval if already started', () => {
      const Ticker = function Ticker() {
        this.run = jest.fn();
      };
      const DecoratedInterval = interval(Ticker);
      const instance = new DecoratedInterval(100);

      instance.start();
      instance.start();
      instance.start();
      instance.end();
      instance.start();

      expect(setInterval).toHaveBeenCalledTimes(2);
    });
    test("if not started, should run the ticker's init method if it has one", () => {
      const init = jest.fn();
      const Ticker = jest.fn(function t() {
        this.run = jest.fn();
        this.init = init;
      });
      const DecoratedTicker = interval(Ticker);
      const extraArgs = [10, 'yes', { id: 10 }];
      const instance = new DecoratedTicker(100, ...extraArgs);

      instance.start();

      expect(init).toHaveBeenCalledTimes(1);
    });
  });

  describe('end', () => {
    test('should call clearInterval with the correct intervalId only if interval has started', () => {
      const intervalId = 1;
      const oldSetInterval = setInterval;
      const Ticker = function Ticker() {
        this.run = jest.fn();
      };
      const DecoratedInterval = interval(Ticker);
      const instance = new DecoratedInterval(100);

      window.setInterval = jest.fn(() => intervalId);

      instance.end();

      expect(clearInterval).not.toHaveBeenCalled();

      instance.start();

      window.setInterval = oldSetInterval;

      instance.end();
      instance.end();
      instance.end();

      expect(clearInterval).toHaveBeenCalledTimes(1);
      expect(clearInterval).toHaveBeenCalledWith(intervalId);
    });
  });
});
