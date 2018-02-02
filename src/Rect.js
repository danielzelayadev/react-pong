import styled from 'styled-components';

const defaultWidth = 30;
const defaultHeight = 250;
const defaultColor = '#000';
const defaultX = 0;
const defaultY = 0;

const Rect = styled.div`
  background-color: ${({ color = defaultColor }) => color};
  width: ${({ width = defaultWidth }) => width}px;
  height: ${({ height = defaultHeight }) => height}px;
  transform: ${({ x = defaultX, y = defaultY }) => `translate(${x}px, ${y}px)`};
  display: inline-block;
  transition: transform 150ms ease-in-out;
`;

export default Rect;
