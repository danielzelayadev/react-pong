import {
  focusElement,
  randomUnitVector,
  randomUnit,
  collisionDetected
} from './helpers';

const isUnit = v => v === 1 || v === -1;

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

describe('randomUnit', () => {
  test('should return a random unit', () => {
    const a = randomUnit();
    const b = randomUnit();
    const c = randomUnit();
    const d = randomUnit();
    const e = randomUnit();

    expect(isUnit(a)).toBe(true);
    expect(isUnit(b)).toBe(true);
    expect(isUnit(c)).toBe(true);
    expect(isUnit(d)).toBe(true);
    expect(isUnit(e)).toBe(true);
  });
});

describe('collisionDetected', () => {
  test('should return true if collision is detected', () => {
    expect(
      collisionDetected(
        {
          x: 10,
          y: 10,
          x2: 15,
          y2: 15
        },
        {
          x: 15,
          y: 11,
          x2: 20,
          y2: 16
        }
      )
    ).toBe(true);
    expect(
      collisionDetected(
        {
          x: 10,
          y: 10,
          x2: 15,
          y2: 15
        },
        {
          x: 12,
          y: 5,
          x2: 20,
          y2: 10
        }
      )
    ).toBe(true);
    expect(
      collisionDetected(
        {
          x: 10,
          y: 10,
          x2: 15,
          y2: 15
        },
        {
          x: 5,
          y: 12,
          x2: 10,
          y2: 17
        }
      )
    ).toBe(true);
    expect(
      collisionDetected(
        {
          x: 10,
          y: 10,
          x2: 15,
          y2: 15
        },
        {
          x: 12,
          y: 15,
          x2: 20,
          y2: 20
        }
      )
    ).toBe(true);
  });
  test('should return false if collision is not detected', () => {
    expect(
      collisionDetected(
        {
          x: 10,
          y: 10,
          x2: 15,
          y2: 15
        },
        {
          x: 20,
          y: 11,
          x2: 20,
          y2: 16
        }
      )
    ).toBe(false);
    expect(
      collisionDetected(
        {
          x: 10,
          y: 10,
          x2: 15,
          y2: 15
        },
        {
          x: 15,
          y: 0,
          x2: 20,
          y2: 5
        }
      )
    ).toBe(false);
    expect(
      collisionDetected(
        {
          x: 10,
          y: 10,
          x2: 15,
          y2: 15
        },
        {
          x: 15,
          y: 20,
          x2: 20,
          y2: 28
        }
      )
    ).toBe(false);
    expect(
      collisionDetected(
        {
          x: 10,
          y: 10,
          x2: 15,
          y2: 15
        },
        {
          x: 0,
          y: 11,
          x2: 5,
          y2: 16
        }
      )
    ).toBe(false);
  });
});
