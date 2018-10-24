import {
  App,
} from './App';
import {
  shallow,
} from 'enzyme';

import * as React from 'react';

it ('Renders shallowly without crashing.', () => {
  shallow(<App />);
});
