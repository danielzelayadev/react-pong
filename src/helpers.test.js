import { focusElement } from './helpers';

describe('focusElement', () => {
  test('should throw error if no element is passed', () => {
    expect(focusElement).toThrowError();
  });
  test("should call the element's focus method if an element is provided", () => {
    const fakeElement = { focus: jest.fn() };
    focusElement(fakeElement);
    expect(fakeElement.focus).toHaveBeenCalled();
  });
});
