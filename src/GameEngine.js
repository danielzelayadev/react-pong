import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameEngine extends Component {
  state = {
    objects: [...this.props.objects]
  };
  getRenderableObjects() {}
  render() {
    return null;
  }
}

GameEngine.defaultProps = {
  objects: []
};

GameEngine.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.object)
};

export default GameEngine;
