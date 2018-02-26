import React from 'react';
import { shallow } from 'enzyme';
import GameEngine from './GameEngine';

describe('on init', () => {
  test('should set the state `objects` to be equal to a copy of the `objects` from the props', () => {
    const expected = [];
    const instance = shallow(<GameEngine objects={expected} />).instance();
    const actual = instance.state.objects;

    expect(actual).toEqual(expected);
    expect(actual).not.toBe(expected);
  });
  test('should set the props `objects` to be equal to an empty array if no object array is provided', () => {
    const instance = shallow(<GameEngine />).instance();
    const actual = instance.props.objects;
    const expected = [];

    expect(actual).toEqual(expected);
  });
});

describe('getRenderableObjects', () => {
  test('should return all objects with a renderable and a transform type component', () => {
    const objects = [
      {
        name: 'Player',
        components: [
          {
            type: 'transform',
            position: { x: 100, y: 20 }
          }
        ]
      },
      {
        name: 'CPU',
        components: [
          {
            type: 'transform',
            position: { x: 100, y: 20 }
          },
          {
            type: 'shapeRenderer',
            shape: 'rectangle'
          }
        ]
      },
      {
        name: 'GameMaster',
        components: [
          {
            type: 'script',
            action: () => {}
          }
        ]
      }
    ];
    const instance = shallow(<GameEngine objects={objects} />).instance();
    const actual = instance.getRenderableObjects();
    const expected = [
      {
        name: 'CPU',
        components: [
          {
            type: 'transform',
            position: { x: 100, y: 20 }
          },
          {
            type: 'shapeRenderer',
            shape: 'rectangle'
          }
        ]
      }
    ];

    expect(actual).toEqual(expected);
  });
});
