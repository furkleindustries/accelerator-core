import {
  shallow,
} from 'enzyme';

import * as React from 'react';

it('Renders shallowly without crashing.', () => {
  const oldQuerySelector = document.querySelector;
  document.querySelector = jest.fn(() => ({}));

  const App = require('./App').App;
  const func = () => shallow(<App />);
  expect(func).not.toThrow();

  document.querySelector = oldQuerySelector;
});
