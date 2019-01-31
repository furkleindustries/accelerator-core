import {
  PassageContainerConnected,
} from '../PassageContainer/PassageContainer';
import {
  hot,
} from 'react-hot-loader';

import * as React from 'react';

import styles from './App.scss';

export class App extends React.Component {
  public render() {
    /* No clue why this is working. Something in the Redux typing is failing
     * in a way that's making it ask for store state props as own props. */
    // @ts-ignore
    const child = <PassageContainerConnected />;

    return (
      <div className={`${styles.app} app`}>
        {child}
      </div>
    );
  }
}

export default hot(module)(App);
