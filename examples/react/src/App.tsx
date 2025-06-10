import { useState } from '@lynx-js/react';
import Basic from './Basic/index.js';
import Stagger from './Stagger/index.js';
import ColorInterception from './ColorInterception/index.js';
import Text from './Text/index.js';
import Spring from './Spring/index.js';

import './App.css';

const CASES = [
  {
    name: 'Basic',
    comp: Basic,
  },
  {
    name: 'Stagger',
    comp: Stagger,
  },
  {
    name: 'ColorInterception',
    comp: ColorInterception,
  },
  {
    name: 'Spring',
    comp: Spring,
  },
  {
    name: 'Text',
    comp: Text,
  },
];

export function App() {
  const [current, setCurrent] = useState(0);

  // @ts-expect-error error
  const CurrentComp = CASES[current].comp;

  return (
    <view className='container'>
      <view className='button-area'>
        {CASES.map((item, index) => {
          return (
            <view
              key={item.name}
              className='button'
              bindtap={() => setCurrent(index)}
            >
              <text>{item.name}</text>
            </view>
          );
        })}
      </view>
      <text className='text-area'>Current case is: {CASES[current]?.name}</text>
      <view className='case-area'>
        {<CurrentComp />}
      </view>
    </view>
  );
}
