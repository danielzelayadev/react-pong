import React, { Component } from 'react';
import styled from 'styled-components';
import Rect from './Rect';

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
  onKeyDown = ({ keyCode }) => {
    const { leftPaddle } = this.state;

    if (keyCode === 87)
      this.setState({
        ...this.state,
        leftPaddle: this.didHitUpperLimit(leftPaddle.y)
          ? leftPaddle
          : this.moveUp(leftPaddle)
      });
    if (keyCode === 83)
      this.setState({
        ...this.state,
        leftPaddle: this.didHitLowerLimit(leftPaddle.y)
          ? leftPaddle
          : this.moveDown(leftPaddle)
      });
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
    return pos + this.stageHeight / 2 > this.stageHeight - this.speed;
  }
  speed = 50;
  stageWidth = 1500;
  stageHeight = 1000;
  render() {
    const { leftPaddle } = this.state;

    return (
      <Wrapper onKeyDown={this.onKeyDown} tabIndex="0">
        <Rect width={`${this.stageWidth}px`} height={`${this.stageHeight}px`}>
          <Rect
            id="left-paddle"
            width="30px"
            height="50%"
            bgColor="#fff"
            {...leftPaddle}
          />
        </Rect>
      </Wrapper>
    );
  }
}

export default App;
