// @flow

import styled from 'styled-components';

const defaultDims = '100px';
const defaultBgColor = '#000';

const Wrapper = styled.div`
  background-color: ${({ bgColor = defaultBgColor }) => bgColor};
  width: ${({ width = defaultDims }) => width};
  height: ${({ height = defaultDims }) => height};
  display: inline-block;
  position: relative;
`;

export default Wrapper;
