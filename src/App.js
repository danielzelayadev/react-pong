import React, { Component } from 'react';
import styled from 'styled-components';
import Rect from './Rect';
import { focusElement, randomUnitVector } from './helpers';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 98vh;
  justify-content: center;
  align-items: center;
  outline: none;
`;

class App extends Component {
  state = {
    leftPaddle: {
      x: 100,
      y: 375
    },
    rightPaddle: {
      x: 1340,
      y: 375
    },
    ball: {
      id: 'ball',
      color: '#fff',
      width: 30,
      height: 30,
      x: 680,
      y: 280
    }
  };
  componentDidMount() {
    focusElement(this.wrapper);
    this.ballDir = randomUnitVector();
    this.gameLoopId = setInterval(this.gameLoop, this.loopMs);
  }
  componentWillUnmount() {
    clearInterval(this.gameLoopId);
  }
  onKeyDown = ({ keyCode }) => {
    this.controls[keyCode] = true;
  };
  onKeyUp = ({ keyCode }) => {
    this.controls[keyCode] = false;
  };
  gameLoop = () => {
    const { controls, speed, ballDir } = this;
    const { leftPaddle, ball } = this.state;

    if (ballDir) {
      ball.x = ball.x * ballDir.x + speed;
      ball.y = ball.y * ballDir.y + speed;
    }

    if (controls['87'] && !this.didHitUpperLimit(leftPaddle.y))
      leftPaddle.y -= speed;
    if (controls['83'] && !this.didHitLowerLimit(leftPaddle.y))
      leftPaddle.y += speed;

    this.setState({
      ...this.state,
      leftPaddle,
      ball
    });
  };
  didHitUpperLimit(pos) {
    return pos < this.speed;
  }
  didHitLowerLimit(pos) {
    return pos + this.paddleHeight > this.stageHeight - this.speed;
  }
  speed = 75;
  stageWidth = 1500;
  stageHeight = 1000;
  paddleWidth = 30;
  paddleHeight = 250;
  controls = {
    '87': false,
    '83': false
  };
  loopMs = 75;
  render() {
    const { leftPaddle, rightPaddle, ball } = this.state;

    return (
      <Wrapper
        innerRef={wrapper => {
          this.wrapper = wrapper;
        }}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        tabIndex="0"
      >
        <Rect width={this.stageWidth} height={this.stageHeight}>
          <Rect
            id="left-paddle"
            width={this.paddleWidth}
            height={this.paddleHeight}
            color="#fff"
            {...leftPaddle}
          />
          <Rect {...ball} />
          <Rect
            id="right-paddle"
            width={this.paddleWidth}
            height={this.paddleHeight}
            color="#fff"
            {...rightPaddle}
          />
        </Rect>
      </Wrapper>
    );
  }
}

export default App;
