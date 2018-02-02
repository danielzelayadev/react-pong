import React, { Component } from 'react';
import styled from 'styled-components';
import Rect from './Rect';
import { focusElement } from './helpers';

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
      y: 300
    }
  };
  componentDidMount() {
    focusElement(this.wrapper);
    this.inputLoopId = setInterval(this.inputLoop, 10);
  }
  componentWillUnmount() {
    clearInterval(this.inputLoopId);
  }
  inputLoop = () => {};
  onKeyDown = ({ keyCode }) => {
    const { leftPaddle } = this.state;

    if (this.controls[keyCode] !== undefined) this.controls[keyCode] = true;

    if (keyCode === 87) {
      this.setState({
        ...this.state,
        leftPaddle: this.didHitUpperLimit(leftPaddle.y)
          ? leftPaddle
          : this.moveUp(leftPaddle)
      });
    }
    if (keyCode === 83) {
      this.setState({
        ...this.state,
        leftPaddle: this.didHitLowerLimit(leftPaddle.y)
          ? leftPaddle
          : this.moveDown(leftPaddle)
      });
    }
  };
  onKeyUp = ({ keyCode }) => {
    if (this.controls[keyCode] !== undefined) this.controls[keyCode] = false;
  };
  moveUp = paddle => ({
    ...paddle,
    y: paddle.y - this.speed
  });
  moveDown = paddle => ({
    ...paddle,
    y: paddle.y + this.speed
  });
  didHitUpperLimit(pos) {
    return pos < this.speed;
  }
  didHitLowerLimit(pos) {
    return pos + this.paddleHeight > this.stageHeight - this.speed;
  }
  speed = 50;
  stageWidth = 1500;
  stageHeight = 1000;
  paddleWidth = 30;
  paddleHeight = this.stageHeight / 2;
  controls = {
    '87': false,
    '83': false
  };
  render() {
    const { leftPaddle } = this.state;

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
        </Rect>
      </Wrapper>
    );
  }
}

export default App;
