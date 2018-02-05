import React from 'react';
import { shallow, mount } from 'enzyme';

const shallowOptions = { disableLifecycleMethods: true };

const gameLoopMs = 75;

const importApp = () => require('./App.js').default;

let App = importApp();

beforeEach(() => {
  jest.resetModules();
});

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

test(`game loop should start on mount to run every ${gameLoopMs}s`, () => {
  const instance = mount(<App />).instance();

  instance.gameLoop = jest.fn();

  instance.componentDidMount();

  expect(setInterval).toHaveBeenCalledWith(instance.gameLoop, gameLoopMs);
  expect(setInterval).toHaveBeenCalledTimes(2);
  expect(instance.gameLoopId).toBeDefined();
});

test('game loop interval should be cleared on unmount', () => {
  const wrapper = mount(<App />);
  const { gameLoopId } = wrapper.instance();

  wrapper.unmount();

  expect(clearInterval).toHaveBeenCalledWith(gameLoopId);
});

test(`game loop should be called every ${gameLoopMs}ms`, () => {
  const instance = mount(<App />).instance();
  const timePassed = 123487;
  const timesCalled = Math.floor(timePassed / gameLoopMs);

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
  jest.doMock('./helpers', () => jest.genMockFromModule('./helpers'));

  App = importApp();

  const { focusElement } = require('./helpers');
  const wrapper = mount(<App />);
  const instance = wrapper.instance();

  expect(focusElement).toHaveBeenCalledWith(instance.wrapper);
});

test('ball should be set an initial direction on mount via randomUnitVector', () => {
  const expectedBallDir = {
    x: -1,
    y: 1
  };

  jest.doMock('./helpers', () => {
    const module = jest.genMockFromModule('./helpers');
    return {
      ...module,
      randomUnitVector: jest.fn(() => expectedBallDir)
    };
  });

  App = importApp();

  const { randomUnitVector } = require('./helpers');

  const { ballDir } = mount(<App />).instance();

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
    x: ball.x + ball.speed * instance.ballDir.x,
    y: ball.y - ball.speed * instance.ballDir.y
  };

  instance.gameLoop();

  expect({
    x: ball.x,
    y: ball.y
  }).toEqual(expectedBallPos);
  expect(wrapper).toMatchSnapshot();
});

test('ball should bounce back if it hits the upper stage border', () => {
  const wrapper = mount(<App />);
  const instance = wrapper.instance();

  instance.state.ball = {
    ...instance.state.ball,
    y: 0
  };

  instance.ballDir = {
    x: 0,
    y: 1
  };

  instance.gameLoop();

  expect(instance.ballDir.y).toBe(-1);
  expect(instance.state.ball.y).toBe(0);

  instance.gameLoop();

  expect(instance.state.ball.y).toBe(instance.state.ball.speed);
});

test('ball should bounce back if it hits the lower stage border', () => {
  const wrapper = mount(<App />);
  const instance = wrapper.instance();
  const { x, speed } = instance.state.ball;
  const y = instance.stageHeight - instance.state.ball.height;

  instance.state.ball = {
    ...instance.state.ball,
    y
  };

  instance.ballDir = {
    x: 1,
    y: -1
  };

  instance.gameLoop();

  expect(instance.ballDir.y).toBe(1);
  expect(instance.ballDir.x).toBe(1);
  expect(instance.state.ball.y).toBe(y);
  expect(instance.state.ball.x).toBe(x + speed);

  instance.gameLoop();

  expect(instance.state.ball.y).toBe(y - speed);
});

test('ball should remount, reset its position if it goes out of bounds and stay put', () => {
  const wrapper = mount(<App />);
  const instance = wrapper.instance();
  const {
    state: { ball },
    gameLoop,
    stageWidth,
    ballStartX,
    ballStartY
  } = instance;

  const outOfB = [
    -1000,
    stageWidth + ball.width + 400,
    -400,
    stageWidth + ball.width + 300
  ];

  outOfB.forEach(x => {
    ball.x = x;
    ball.y = ballStartY;
    instance.ballDir = {
      x: 1,
      y: 1
    };

    wrapper.mount();

    expect(wrapper.find('#ball').length).toBe(0);

    gameLoop();

    wrapper.mount();

    expect(wrapper.find('#ball').length).toBeGreaterThan(0);
    expect(ball.x).toBe(ballStartX);
    expect(ball.y).toBe(ballStartY);
    expect(ball.y).toBe(ballStartY);
    expect(ball.y).toBe(ballStartY);
    expect(instance.ballDir).toEqual({
      x: 0,
      y: 0
    });
  });
});

test('ball should relaunch 2s after its position is reset', () => {
  const expectedBallDir = {
    x: -1,
    y: 1
  };

  jest.doMock('./helpers', () => {
    const module = jest.genMockFromModule('./helpers');
    return {
      ...module,
      randomUnitVector: jest.fn(() => expectedBallDir)
    };
  });

  App = importApp();

  const { randomUnitVector } = require('./helpers');

  const wrapper = mount(<App />);
  const instance = wrapper.instance();
  const { state: { ball }, gameLoop, stageWidth, ballStartY } = instance;

  const outOfB = [
    -1000,
    stageWidth + ball.width + 400,
    -400,
    stageWidth + ball.width + 300
  ];

  outOfB.forEach(x => {
    ball.x = x;
    ball.y = ballStartY;
    instance.ballDir = {
      x: 1,
      y: 1
    };

    gameLoop();

    jest.advanceTimersByTime(2000);

    expect(randomUnitVector).toHaveBeenCalled();
    expect(instance.ballDir).toEqual(expectedBallDir);
  });
});

test('ball should bounce back if it collides with left paddle', () => {
  jest.doMock('./helpers', () => {
    const module = jest.genMockFromModule('./helpers');
    return {
      ...module,
      collisionDetected: jest.fn(() => true)
    };
  });

  App = importApp();

  const wrapper = mount(<App />);
  const instance = wrapper.instance();
  const {
    state: { ball, leftPaddle },
    gameLoop,
    paddleWidth,
    paddleHeight
  } = instance;

  ball.x = leftPaddle.x + paddleWidth;
  ball.y = leftPaddle.y + paddleHeight / 2;
  instance.ballDir = {
    x: -1,
    y: -1
  };

  const { x, y } = ball;

  gameLoop();

  expect(instance.ballDir.x).toBe(1);
  expect(instance.ballDir.y).toBe(-1);
  expect(ball.x).toBe(x + ball.speed);
  expect(ball.y).toBe(y + ball.speed);
});

test('ball should bounce back if it collides with right paddle', () => {
  jest.doMock('./helpers', () => {
    const module = jest.genMockFromModule('./helpers');
    let i = 0;

    return {
      ...module,
      collisionDetected: jest.fn(() => i++ > 0)
    };
  });

  App = importApp();

  const wrapper = mount(<App />);
  const instance = wrapper.instance();
  const { state: { ball, rightPaddle }, gameLoop } = instance;
  const { y, speed } = ball;
  const x = rightPaddle.x - ball.width;

  jest.doMock('./helpers', () => ({
    collisionDetected: a => a.x === rightPaddle.x
  }));

  ball.x = x;
  instance.ballDir = {
    x: 1,
    y: 0
  };

  gameLoop();

  expect(instance.ballDir.x).toBe(-1);
  expect(instance.ballDir.y).toBe(0);
  expect(ball.x).toBe(x - speed);
  expect(ball.y).toBe(y);
});

describe('CPU', () => {
  describe('ball moving towards it', () => {
    test('should go down if ball is below', () => {
      const instance = shallow(<App />, shallowOptions).instance();
      const {
        state: { rightPaddle, ball },
        gameLoop,
        speed,
        paddleHeight
      } = instance;

      const initCPUY = 5;

      rightPaddle.y = initCPUY;

      instance.ballDir = {
        x: 1,
        y: 0
      };
      ball.y = rightPaddle.y + paddleHeight + 10;

      gameLoop();

      expect(rightPaddle.y).toBe(initCPUY + speed);
      expect(rightPaddle.dir).toBe(-1);
    });

    test('should go up if ball is above', () => {
      const instance = shallow(<App />, shallowOptions).instance();
      const { state: { rightPaddle, ball }, gameLoop, speed } = instance;

      const initCPUY = 90;

      rightPaddle.y = initCPUY;

      instance.ballDir = {
        x: 1,
        y: 0
      };
      ball.y = 5;

      gameLoop();

      expect(rightPaddle.y).toBe(initCPUY - speed);
      expect(rightPaddle.dir).toBe(1);
    });

    // test('should stay put if ball is in vertical range', () => {
    //   const instance = mount(<App />).instance();
    //   const { state: { rightPaddle, ball }, ballDir, gameLoop } = instance;

    //   const initCPUY = 50;

    //   rightPaddle.y = initCPUY;

    //   ballDir.x = 1;
    //   ball.y = 55;

    //   gameLoop();

    //   expect(rightPaddle.y).toBe(initCPUY);
    //   expect(rightPaddle.dir).toBe(0);
    // });
  });
});
