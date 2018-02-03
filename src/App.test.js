import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

jest.mock('./helpers', () => ({
  focusElement: jest.fn(),
  randomUnitVector: jest.fn(() => ({
    x: -1,
    y: 1
  }))
}));

const { focusElement, randomUnitVector } = require('./helpers');

const shallowOptions = { disableLifecycleMethods: true };

const gameLoopMs = 75;

test('should render without crashing', () => {
  const wrapper = shallow(<App />, shallowOptions);
  expect(wrapper).toMatchSnapshot();
});

test('left paddle should move up if W is down', () => {
  const wrapper = shallow(<App />, shallowOptions);
  const instance = wrapper.instance();
  const leftPaddle = wrapper.find('#left-paddle').first();
  const y0 = leftPaddle.props().y;

  instance.controls = {
    '87': true,
    '83': false
  };

  instance.gameLoop();

  expect(wrapper.state().leftPaddle.y).toBe(y0 - wrapper.instance().speed);
  expect(wrapper).toMatchSnapshot();
});

test('left paddle should move down if S is down', () => {
  const wrapper = shallow(<App />, shallowOptions);
  const instance = wrapper.instance();
  const leftPaddle = wrapper.find('#left-paddle').first();
  const y0 = leftPaddle.props().y;

  instance.controls = {
    '87': false,
    '83': true
  };

  instance.gameLoop();

  expect(wrapper.state().leftPaddle.y).toBe(y0 + wrapper.instance().speed);
  expect(wrapper).toMatchSnapshot();
});

test('all game controls should be false on mount', () => {
  const controls = {
    '87': false,
    '83': false
  };
  const instControls = shallow(<App />, shallowOptions).instance().controls;

  expect(instControls).toEqual(controls);
});

test('a control key should be equal to true when their respective key is down', () => {
  const wrapper = shallow(<App />, shallowOptions);

  wrapper.simulate('keydown', { keyCode: 87 });
  wrapper.simulate('keydown', { keyCode: 83 });

  expect(wrapper.instance().controls['87']).toBe(true);
  expect(wrapper.instance().controls['83']).toBe(true);
});

test('a control key should be equal to false when their respective key is up', () => {
  const wrapper = shallow(<App />, shallowOptions);

  wrapper.simulate('keydown', { keyCode: 87 });
  wrapper.simulate('keyup', { keyCode: 87 });
  wrapper.simulate('keydown', { keyCode: 83 });
  wrapper.simulate('keyup', { keyCode: 83 });

  expect(wrapper.instance().controls['87']).toBe(false);
  expect(wrapper.instance().controls['83']).toBe(false);
});

test('unknown key downs and ups should be ignored', () => {
  const wrapper = shallow(<App />, shallowOptions);

  wrapper.simulate('keydown', { keyCode: 90 });
  wrapper.simulate('keyup', { keyCode: 90 });

  expect(wrapper).toMatchSnapshot();
});

test(`input loop should start on mount to run every ${gameLoopMs}s`, () => {
  const instance = mount(<App />).instance();

  instance.gameLoop = jest.fn();

  instance.componentDidMount();

  expect(setInterval).toHaveBeenCalledWith(instance.gameLoop, gameLoopMs);
  expect(setInterval).toHaveBeenCalledTimes(2);
  expect(instance.gameLoopId).toBeDefined();
});

test('input loop interval should be cleared on unmount', () => {
  const wrapper = mount(<App />);
  const { gameLoopId } = wrapper.instance();

  wrapper.unmount();

  expect(clearInterval).toHaveBeenCalledWith(gameLoopId);
});

test('input loop should be called every 75ms', () => {
  const instance = mount(<App />).instance();
  const timePassed = 123487;
  const timesCalled = Math.floor(timePassed / 75);

  instance.gameLoop = jest.fn();

  instance.componentDidMount();

  jest.advanceTimersByTime(timePassed);

  expect(instance.gameLoop).toHaveBeenCalledTimes(timesCalled);
});

test('leftPaddle Y coordinate should stay the same if upper limit is reached', () => {
  const wrapper = shallow(<App />, shallowOptions);
  const instance = wrapper.instance();
  const event = { keyCode: 87 };

  instance.setState({
    ...instance.state,
    leftPaddle: {
      ...instance.state.leftPaddle,
      y: 0
    }
  });

  wrapper.simulate('keydown', event);

  instance.gameLoop();

  expect(wrapper.state().leftPaddle.y).toBe(0);
  expect(wrapper).toMatchSnapshot();
});

test('leftPaddle Y coordinate should stay the same if lower limit is reached', () => {
  const wrapper = shallow(<App />, shallowOptions);
  const instance = wrapper.instance();
  const event = { keyCode: 83 };
  const limit = instance.stageHeight - instance.paddleHeight;

  instance.setState({
    ...instance.state,
    leftPaddle: {
      ...instance.state.leftPaddle,
      y: limit
    }
  });

  wrapper.simulate('keydown', event);

  instance.gameLoop();

  expect(wrapper.state().leftPaddle.y).toBe(limit);
  expect(wrapper).toMatchSnapshot();
});

test('should gain focus on mount', () => {
  const wrapper = mount(<App />);
  const instance = wrapper.instance();
  expect(focusElement).toHaveBeenCalledWith(instance.wrapper);
});

test('ball should be set an initial direction on mount via randomUnitVector', () => {
  const { ballDir } = mount(<App />).instance();
  const expectedBallDir = {
    x: -1,
    y: 1
  };

  expect(randomUnitVector).toHaveBeenCalled();
  expect(ballDir).toEqual(expectedBallDir);
});

test('ball should move in its direction on gameLoop tick', () => {
  const wrapper = shallow(<App />, shallowOptions);
  const instance = wrapper.instance();
  const { ball } = instance.state;

  instance.ballDir = {
    x: 1,
    y: 1
  };

  const expectedBallPos = {
    x: ball.x * instance.ballDir.x + instance.speed,
    y: ball.y * instance.ballDir.y + instance.speed
  };

  instance.gameLoop();

  expect({
    x: ball.x,
    y: ball.y
  }).toEqual(expectedBallPos);
});
