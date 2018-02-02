// @flow

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
  const leftPaddle = wrapper.find('#left-paddle').first();
  const event = { keyCode: 87 };

  const y0 = leftPaddle.props().y;

  wrapper.simulate('keydown', event);

  expect(wrapper.state().leftPaddle.y).toBe(y0 - wrapper.instance().speed);
  expect(wrapper).toMatchSnapshot();
});

test('left paddle should move down if S is down', () => {
  const wrapper = shallow(<App />, shallowOptions);
  const leftPaddle = wrapper.find('#left-paddle').first();
  const event = { keyCode: 83 };

  const y0 = leftPaddle.props().y;

  wrapper.simulate('keydown', event);

  expect(wrapper.state().leftPaddle.y).toBe(y0 + wrapper.instance().speed);
  expect(wrapper).toMatchSnapshot();
});

test('nothing should happen if any other key is down', () => {
  const wrapper = shallow(<App />, shallowOptions);
  const event = { keyCode: -1 };

  wrapper.simulate('keydown', event);

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

  expect(wrapper.state().leftPaddle.y).toBe(0);
  expect(wrapper).toMatchSnapshot();
});

test('leftPaddle Y coordinate should stay the same if lower limit is reached', () => {
  const wrapper = shallow(<App />, shallowOptions);
  const instance = wrapper.instance();
  const event = { keyCode: 83 };
  const limit = instance.stageHeight - instance.stageHeight / 2;

  instance.setState({
    ...instance.state,
    leftPaddle: {
      ...instance.state.leftPaddle,
      y: limit
    }
  });

  wrapper.simulate('keydown', event);

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
