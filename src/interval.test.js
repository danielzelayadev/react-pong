import interval from './interval';

beforeEach(() => {
  jest.clearAllMocks();
});

test('given a "ticker" class, should return a decorated interval class', () => {
  const actual = interval(function Ticker() {
    this.run = jest.fn();
    this.ms = 100;
  });

  expect(typeof actual).toBe('function');
});

test('should throw error if "Ticker" param is not a function', () => {
  expect(interval.bind(null, 5)).toThrowError(
    'Must provide a function prototype or class'
  );
});

describe('decorated interval class', () => {
  test('should instantiate the "ticker" class', () => {
    const Ticker = jest.fn(function t() {
      this.run = jest.fn();
      this.ms = 100;
    });
    const DecoratedTicker = interval(Ticker);
    (() => new DecoratedTicker())();

    expect(Ticker).toHaveBeenCalledTimes(1);
  });
  test('should throw error if the "ticker" class instance has no run function or ms prop', () => {
    const testCases = [
      () => {},
      function t() {
        this.run = 10;
        this.ms = '3';
      },
      function t() {
        this.run = jest.fn();
      },
      function t() {
        this.ms = 100;
      }
    ];
    testCases.forEach(testCase => {
      const DecoratedTicker = interval(testCase);
      expect(() => new DecoratedTicker()).toThrowError(
        'Must provide a function prototype/class with a `run` callback and `ms` number'
      );
    });
  });
  test('should throw error if ms is a negative number', () => {
    const Ticker = function Ticker() {
      this.run = jest.fn();
      this.ms = -100;
    };
    const DecoratedInterval = interval(Ticker);
    expect(() => new DecoratedInterval()).toThrowError(
      'ms must be a positive number'
    );
  });
  test('should have a start and end function', () => {
    const DecoratedInterval = interval(function Ticker() {
      this.run = jest.fn();
      this.ms = 100;
    });
    const instance = new DecoratedInterval();

    expect(typeof instance.start).toBe('function');
    expect(typeof instance.end).toBe('function');
  });
  describe('start', () => {
    test("should call setInterval exactly 1 time with the provided child interval's ms and run callback", () => {
      const run = jest.fn();
      const ms = 100;
      const Ticker = function Ticker() {
        this.run = run;
        this.ms = ms;
      };
      const DecoratedInterval = interval(Ticker);
      const instance = new DecoratedInterval();

      instance.start();

      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenCalledWith(run, ms);
    });
    test('should not call setInterval if already started', () => {
      const Ticker = function Ticker() {
        this.run = jest.fn();
        this.ms = 100;
      };
      const DecoratedInterval = interval(Ticker);
      const instance = new DecoratedInterval();

      instance.start();
      instance.start();
      instance.start();
      instance.end();
      instance.start();

      expect(setInterval).toHaveBeenCalledTimes(2);
    });
  });

  describe('end', () => {
    test('should call clearInterval with the correct intervalId only if interval has started', () => {
      const intervalId = 1;
      const oldSetInterval = setInterval;
      const Ticker = function Ticker() {
        this.run = jest.fn();
        this.ms = 100;
      };
      const DecoratedInterval = interval(Ticker);
      const instance = new DecoratedInterval();

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
