import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

const shallowOptions = { disableLifecycleMethods: true };

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

  instance.inputLoop();

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

  instance.inputLoop();

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

test('input loop should start on mount to run every 75ms', () => {
  const instance = mount(<App />).instance();

  instance.inputLoop = jest.fn();

  instance.componentDidMount();

  expect(setInterval).toHaveBeenCalledWith(instance.inputLoop, 75);
  expect(setInterval).toHaveBeenCalledTimes(2);
  expect(instance.inputLoopId).toBeDefined();
});

test('input loop interval should be cleared on unmount', () => {
  const wrapper = mount(<App />);
  const { inputLoopId } = wrapper.instance();

  wrapper.unmount();

  expect(clearInterval).toHaveBeenCalledWith(inputLoopId);
});

test('input loop should be called every 75ms', () => {
  const instance = mount(<App />).instance();
  const timePassed = 123487;
  const timesCalled = Math.floor(timePassed / 75);

  instance.inputLoop = jest.fn();

  instance.componentDidMount();

  jest.advanceTimersByTime(timePassed);

  expect(instance.inputLoop).toHaveBeenCalledTimes(timesCalled);
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

  instance.inputLoop();

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

  instance.inputLoop();

  expect(wrapper.state().leftPaddle.y).toBe(limit);
  expect(wrapper).toMatchSnapshot();
});

test('should gain focus on mount', () => {
  const wrapper = mount(<App />);
  const instance = wrapper.instance();
  instance.wrapper = { focus: jest.fn() };
  instance.componentDidMount();
  expect(instance.wrapper.focus).toHaveBeenCalled();
});
