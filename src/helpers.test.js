import { focusElement, randomUnitVector } from './helpers';
import { isUnit } from './testHelpers';

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

describe('randomUnitVector', () => {
  test('should return a random unit vector', () => {
    const a = randomUnitVector();
    const b = randomUnitVector();
    const c = randomUnitVector();
    const d = randomUnitVector();
    const e = randomUnitVector();

    expect(isUnit(a.x) && isUnit(a.y)).toBe(true);
    expect(isUnit(b.x) && isUnit(b.y)).toBe(true);
    expect(isUnit(c.x) && isUnit(c.y)).toBe(true);
    expect(isUnit(d.x) && isUnit(d.y)).toBe(true);
    expect(isUnit(e.x) && isUnit(e.y)).toBe(true);
  });
});
