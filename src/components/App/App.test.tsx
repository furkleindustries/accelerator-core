import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App
      currentPassage={{
        name: 'testing',
        title: 'a test passage',
        contents: <div>test</div>,
        tags: [],
      }}
      storyState={{
        foo: 'bar',
      }}
    />,
    div,
  );

  ReactDOM.unmountComponentAtNode(div);
});
