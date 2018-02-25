import interval from './interval';

beforeEach(() => {
  jest.clearAllMocks();
});

test('should return a decorated interval class', () => {
  const actual = interval({
    run: jest.fn(),
    ms: 100
  });

  expect(typeof actual).toBe('function');
});

test('should throw error if no object with a run function and ms prop is provided', () => {
  const testCases = [
    undefined,
    {},
    400,
    [],
    'Yes',
    { run: 10, ms: '3' },
    { run: jest.fn() },
    { ms: 100 }
  ];

  testCases.forEach(testCase => {
    expect(interval.bind(null, testCase)).toThrowError(
      'Must provided an object with a `run` callback and `ms` number'
    );
  });
});

test('should throw error if ms is a negative number', () => {
  const child = { run: jest.fn(), ms: -100 };
  expect(interval.bind(null, child)).toThrowError(
    'ms must be a positive number'
  );
});

describe('decorated interval class', () => {
  test('should have a start and end function', () => {
    const DecoratedInterval = interval({
      run: jest.fn(),
      ms: 100
    });
    const instance = new DecoratedInterval();

    expect(typeof instance.start).toBe('function');
    expect(typeof instance.end).toBe('function');
  });
  describe('start', () => {
    test("should call setInterval exactly 1 time with the provided child interval's ms and run callback", () => {
      const childInterval = {
        ms: 300,
        run: jest.fn()
      };
      const DecoratedInterval = interval(childInterval);
      const instance = new DecoratedInterval();

      instance.start();

      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenCalledWith(
        childInterval.run,
        childInterval.ms
      );
    });
  });

  describe('end', () => {
    test('should call clearInterval if start has been called', () => {
      const childInterval = {
        ms: 300,
        run: jest.fn()
      };
      const DecoratedInterval = interval(childInterval);
      const instance = new DecoratedInterval();

      instance.start();
      instance.end();

      expect(clearInterval).toHaveBeenCalled();
    });
    test('should NOT call clearInterval if start has been NOT called', () => {
      const childInterval = {
        ms: 300,
        run: jest.fn()
      };
      const DecoratedInterval = interval(childInterval);
      const instance = new DecoratedInterval();

      instance.end();

      expect(clearInterval).not.toHaveBeenCalled();
    });
  });
});
