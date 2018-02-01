import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Stage from './Stage';

const defaultDims = '100px';
const defaultBgColor = '#000';

test('should render without crashing', () => {
  const wrapper = shallow(<Stage />);
  expect(wrapper).toMatchSnapshot();
});

test(`dimensions should default to '${defaultDims}' if they are not provided`, () => {
  const wrapper = shallow(<Stage />);

  expect(wrapper).toHaveStyleRule('width', defaultDims);
  expect(wrapper).toHaveStyleRule('height', defaultDims);
});

test(`dimensions should equal the dimensions provided`, () => {
  const width = '300px';
  const height = '100px';
  const wrapper = shallow(<Stage width={width} height={height} />);

  expect(wrapper).toHaveStyleRule('width', width);
  expect(wrapper).toHaveStyleRule('height', height);
});

test(`background-color should default to ${defaultBgColor} if not provided`, () => {
  const wrapper = shallow(<Stage />);
  expect(wrapper).toHaveStyleRule('background-color', defaultBgColor);
});

test(`background-color should equal the bgColor provided`, () => {
  const bgColor = '#fff';
  const wrapper = shallow(<Stage bgColor={bgColor} />);

  expect(wrapper).toHaveStyleRule('background-color', bgColor);
});
