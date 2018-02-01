// @flow

import React from 'react';
import styled from 'styled-components';
import Rect from './Rect';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 98vh;
  justify-content: center;
  align-items: center;
`;

const App = () => (
  <Wrapper>
    <Rect width="90%" height="90%" />
  </Wrapper>
);

export default App;
