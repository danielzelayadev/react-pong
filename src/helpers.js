export function focusElement(element) {
  if (!element) throw Error('An element must be passed.');
  element.focus();
}

export const randomUnit = () =>
  Math.round(Math.random() * (Math.round(Math.random()) ? 1 : -1));

export const randomUnitVector = () => ({
  x: randomUnit(),
  y: randomUnit()
});
