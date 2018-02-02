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
        leftPaddle: this.moveUp(leftPaddle)
      });
  };
  moveUp = paddle => ({
    ...paddle,
    y: paddle.y - this.speed
  });
  speed = 5;
  render() {
    const { leftPaddle } = this.state;

    return (
      <Wrapper onKeyDown={this.onKeyDown} tabIndex="0">
        <Rect width="1500px" height="1000px">
          <Rect
            id="left-paddle"
            position="absolute"
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
