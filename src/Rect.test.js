import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Rect from './Rect';

const defaultWidth = 30;
const defaultHeight = 250;
const defaultColor = '#000';
const defaultX = 0;
const defaultY = 0;

test('should render without crashing', () => {
  const wrapper = shallow(<Rect />);
  expect(wrapper).toMatchSnapshot();
});

test(`dimensions should default to ${defaultWidth}x${defaultHeight} if they are not provided`, () => {
  const wrapper = shallow(<Rect />);

  expect(wrapper).toHaveStyleRule('width', `${defaultWidth}px`);
  expect(wrapper).toHaveStyleRule('height', `${defaultHeight}px`);
});

test(`dimensions should equal the dimensions provided`, () => {
  const width = 300;
  const height = 100;
  const wrapper = shallow(<Rect width={width} height={height} />);

  expect(wrapper).toHaveStyleRule('width', `${width}px`);
  expect(wrapper).toHaveStyleRule('height', `${height}px`);
});

test(`background-color should default to ${defaultColor} if not provided`, () => {
  const wrapper = shallow(<Rect />);
  expect(wrapper).toHaveStyleRule('background-color', defaultColor);
});

test(`background-color should equal the color provided`, () => {
  const color = '#fff';
  const wrapper = shallow(<Rect color={color} />);

  expect(wrapper).toHaveStyleRule('background-color', color);
});

test(`coordinates should default to (${defaultX}, ${defaultY}) if not provided`, () => {
  const wrapper = shallow(<Rect />);

  expect(wrapper).toHaveStyleRule(
    'transform',
    `translate(${defaultX}px,${defaultY}px)`
  );
});

test(`coordinates should be equal to the values provided`, () => {
  const x = 300;
  const y = 20;
  const wrapper = shallow(<Rect x={x} y={y} />);

  expect(wrapper).toHaveStyleRule('transform', `translate(${x}px,${y}px)`);
});
