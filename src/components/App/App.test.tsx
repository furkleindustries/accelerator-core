import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  App,
} from './App';

import {
  Provider,
} from 'react-redux';
import {
  createStore,
} from 'redux';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={createStore(() => {})}>
      <App />
    </Provider>,
    div,
  );

  ReactDOM.unmountComponentAtNode(div);
});
