import styled from 'styled-components';

const defaultWidth = '30px';
const defaultHeight = '250px';
const defaultBgColor = '#000';

const Rect = styled.div`
  background-color: ${({ bgColor = defaultBgColor }) => bgColor};
  width: ${({ width = defaultWidth }) => width};
  height: ${({ height = defaultHeight }) => height};
  position: ${({ position }) => {
    if (position === 'absolute') return position;
    return 'relative';
  }};
  display: inline-block;
`;

export default Rect;
