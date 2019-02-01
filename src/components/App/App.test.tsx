import {
  App,
} from './App';
import {
  shallow,
} from 'enzyme';

import * as React from 'react';

it ('Renders shallowly without crashing.', () => {
  const func = () => shallow(<App />);
  expect(func).not.toThrow();
});
