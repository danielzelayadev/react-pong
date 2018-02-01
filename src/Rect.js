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
  position: ${({ position }) => {
    if (position === 'absolute') return position;
    return 'relative';
  }};
  left: ${({ x = defaultX }) => x}px;
  top: ${({ y = defaultY }) => y}px;
  display: inline-block;
`;

export default Rect;
