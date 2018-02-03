import styled from 'styled-components';

const defaultWidth = 30;
const defaultHeight = 250;
const defaultColor = '#000';
const defaultX = 0;
const defaultY = 0;

const Rect = styled.div.attrs({
  style: ({ x = defaultX, y = defaultY }) => ({
    transform: `translate(${x}px,${y}px)`
  })
})`
  background-color: ${({ color = defaultColor }) => color};
  width: ${({ width = defaultWidth }) => width}px;
  height: ${({ height = defaultHeight }) => height}px;
  display: flex;
  transition: transform 150ms ease-in-out;
`;

export default Rect;
