export function focusElement(element) {
  if (!element) throw Error('An element must be passed.');
  element.focus();
}

export const randomUnitVector = () => ({
  x: Math.round(Math.random()) ? 1 : -1,
  y: Math.round(Math.random()) ? 1 : -1
});
