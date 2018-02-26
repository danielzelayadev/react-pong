export default function InputHandler() {
  this.keysDown = {};
}

InputHandler.prototype.keyDown = function keyDown({ keyCode }) {
  this.keysDown[keyCode] = true;
};

InputHandler.prototype.keyUp = function keyUp({ keyCode }) {
  this.keysDown[keyCode] = false;
};

InputHandler.prototype.isKeyDown = function isKeyDown(keyCode) {
  const isKeyDownV = this.keysDown[keyCode.toString()];
  return typeof isKeyDownV === 'undefined' ? false : isKeyDownV;
};
