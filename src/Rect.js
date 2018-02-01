import styled from 'styled-components';

const defaultWidth = '30px';
const defaultHeight = '250px';
const defaultBgColor = '#000';

const Rect = styled.div`
  background-color: ${({ bgColor = defaultBgColor }) => bgColor};
  width: ${({ width = defaultWidth }) => width};
  height: ${({ height = defaultHeight }) => height};
  display: inline-block;
  position: relative;
`;

export default Rect;
