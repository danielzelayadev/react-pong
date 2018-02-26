// @flow

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import App from './App';
import GameEngine from './GameEngine';

const renderTarget = document.getElementById('app');

const renderApp = () => {
  if (renderTarget)
    render(
      <AppContainer>
        <GameEngine />
      </AppContainer>,
      renderTarget
    );
};
renderApp();

if (module.hot) module.hot.accept('./App', () => renderApp());
