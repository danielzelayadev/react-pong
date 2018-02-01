// @flow

import React from 'react';
import styled from 'styled-components';
import Stage from './Stage';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  justify-content: center;
  align-items: center;
`;

const App = () => (
  <Wrapper>
    <Stage width="500px" height="500px" />
  </Wrapper>
);

export default App;
