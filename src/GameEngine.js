import React, { Component } from 'react';
import GameLoop from './game-loop';

class GameEngine extends Component {
  componentDidMount() {
    this.gameLoop.start();
  }
  componentWillUnmount() {
    this.gameLoop.end();
  }
  gameLoop = new GameLoop(75, [
    {
      name: 'Okay',
      components: [{ type: 'script', action: () => console.log('Yay!') }]
    }
  ]);
  render() {
    return <div />;
  }
}

export default GameEngine;
