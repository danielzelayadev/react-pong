import React, { Component } from 'react';
import styled from 'styled-components';
import Rect from './Rect';
import { focusElement, randomUnitVector, collisionDetected } from './helpers';

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
      x: 1370,
      y: 375
    },
    ball: {
      id: 'ball',
      color: '#fff',
      width: 30,
      height: 30,
      x: 735,
      y: 485,
      speed: 60
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
    const { controls, speed, ballDir, paddleWidth, paddleHeight } = this;
    const { leftPaddle, rightPaddle, ball } = this.state;

    if (ballDir) {
      if (this.ballOutOfBounds(ball.x, ball.width)) {
        ball.x = this.ballStartX;
        ball.y = this.ballStartY;
        this.ballDir = {
          x: 0,
          y: 0
        };
        setTimeout(() => {
          this.ballDir = randomUnitVector();
        }, 2000);
      } else {
        if (
          collisionDetected(
            {
              x: ball.x,
              y: ball.y,
              x2: ball.x + ball.width,
              y2: ball.y + ball.height
            },
            {
              x: leftPaddle.x,
              y: leftPaddle.y,
              x2: leftPaddle.x + paddleWidth,
              y2: leftPaddle.y + paddleHeight
            }
          )
        )
          ballDir.x = 1;
        else if (
          collisionDetected(
            {
              x: ball.x,
              y: ball.y,
              x2: ball.x + ball.width,
              y2: ball.y + ball.height
            },
            {
              x: rightPaddle.x,
              y: rightPaddle.y,
              x2: rightPaddle.x + paddleWidth,
              y2: rightPaddle.y + paddleHeight
            }
          )
        )
          ballDir.x = -1;
        this.moveBall();
      }
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
  moveBall = () => {
    const { ballDir } = this;
    const { ball } = this.state;
    const { speed } = ball;

    const ySpace =
      ballDir.y === 1 ? ball.y : this.stageHeight - (ball.y + ball.height);

    ballDir.y *= ySpace ? 1 : -1;

    ball.y -= (speed > ySpace ? ySpace : speed) * ballDir.y;

    ball.x += speed * ballDir.x;
  };
  ballOutOfBounds(x, w) {
    return x < w * -4 || x > this.stageWidth + w * 4;
  }
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
  ballStartX = 735;
  ballStartY = 485;
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
          {!this.ballOutOfBounds(ball.x, ball.width) && <Rect {...ball} />}
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
