import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Rect from './Rect';

const defaultWidth = '30px';
const defaultHeight = '250px';
const defaultBgColor = '#000';
const defaultX = 0;
const defaultY = 0;

test('should render without crashing', () => {
  const wrapper = shallow(<Rect />);
  expect(wrapper).toMatchSnapshot();
});

test(`dimensions should default to ${defaultWidth} X ${defaultHeight} if they are not provided`, () => {
  const wrapper = shallow(<Rect />);

  expect(wrapper).toHaveStyleRule('width', defaultWidth);
  expect(wrapper).toHaveStyleRule('height', defaultHeight);
});

test(`dimensions should equal the dimensions provided`, () => {
  const width = '300px';
  const height = '100px';
  const wrapper = shallow(<Rect width={width} height={height} />);

  expect(wrapper).toHaveStyleRule('width', width);
  expect(wrapper).toHaveStyleRule('height', height);
});

test(`background-color should default to ${defaultBgColor} if not provided`, () => {
  const wrapper = shallow(<Rect />);
  expect(wrapper).toHaveStyleRule('background-color', defaultBgColor);
});

test(`background-color should equal the bgColor provided`, () => {
  const bgColor = '#fff';
  const wrapper = shallow(<Rect bgColor={bgColor} />);

  expect(wrapper).toHaveStyleRule('background-color', bgColor);
});

test(`coordinates should default to (${defaultX}, ${defaultY}) if not provided`, () => {
  const wrapper = shallow(<Rect />);

  expect(wrapper).toHaveStyleRule(
    'transform',
    `translate(${defaultX}px, ${defaultY}px)`
  );
});

test(`coordinates should be equal to the values provided`, () => {
  const x = 300;
  const y = 20;
  const wrapper = shallow(<Rect x={x} y={y} />);

  expect(wrapper).toHaveStyleRule('transform', `translate(${x}px, ${y}px)`);
});
