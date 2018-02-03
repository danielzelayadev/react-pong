export function focusElement(element) {
  if (!element) throw Error('An element must be passed.');
  element.focus();
}

export const randomUnit = () => (Math.round(Math.random()) ? 1 : -1);

export const randomUnitVector = () => ({
  x: randomUnit(),
  y: randomUnit()
});

export const collisionDetected = (a, b) =>
  !(b.x > a.x2 || b.x2 < a.x || b.y > a.y2 || b.y2 < a.y);
