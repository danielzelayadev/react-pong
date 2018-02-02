import styled from 'styled-components';

const defaultWidth = '30px';
const defaultHeight = '250px';
const defaultBgColor = '#000';
const defaultX = 0;
const defaultY = 0;

const Rect = styled.div`
  background-color: ${({ bgColor = defaultBgColor }) => bgColor};
  width: ${({ width = defaultWidth }) => width};
  height: ${({ height = defaultHeight }) => height};
  transform: ${({ x = defaultX, y = defaultY }) => `translate(${x}px, ${y}px)`};
  display: inline-block;
  transition: transform 150ms ease-in-out;
`;

export default Rect;
