export function focusElement(element) {
  if (!element) throw Error('An element must be passed.');
  element.focus();
}
