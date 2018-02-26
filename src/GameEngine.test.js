import React from 'react';
import { shallow } from 'enzyme';

let GameEngine;

beforeEach(() => {
  jest.doMock(
    './game-loop',
    jest.fn(
      () =>
        function F() {
          this.start = jest.fn();
          this.end = jest.fn();
        }
    )
  );
  jest.resetModules();
  GameEngine = require('./GameEngine').default;
});

describe('componentDidMount', () => {
  test('should start the game loop', () => {
    const instance = shallow(<GameEngine />).instance();
    expect(instance.gameLoop.start).toHaveBeenCalledTimes(1);
  });
});

describe('componentWillUnmount', () => {
  test('should end the game loop', () => {
    const wrapper = shallow(<GameEngine />);
    const instance = wrapper.instance();

    wrapper.unmount();

    expect(instance.gameLoop.end).toHaveBeenCalledTimes(1);
  });
});
