import Yes from './tmp';

test('calls mock', () => {
  jest.resetAllMocks();
  const obj = {
    cb: jest.fn(),
    ms: 100
  };
  Yes(obj).lol();

  expect(obj.cb).not.toHaveBeenCalled();

  jest.advanceTimersByTime(obj.ms);

  expect(obj.cb).toHaveBeenCalled();
});
