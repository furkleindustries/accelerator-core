import {
  context,
} from './context';
import {
  PassageContainerConnected,
} from '../PassageContainer/PassageContainer';
import {
  hot,
} from 'react-hot-loader';
import {
  Manager,
} from 'sound-manager';

import * as React from 'react';

import styles from './App.scss';

export class App extends React.Component {
  public render() {
    /* No clue why this is working. Something in the Redux typing is failing
     * in a way that's making it ask for store state props as own props. */
    // @ts-ignore
    const passageContainer = <PassageContainerConnected />;

    return (
      <context.Provider value={{ soundManager: new Manager() }}>
        <div className={`${styles.app} app`}>
          {passageContainer}
        </div>
      </context.Provider>
    );
  }
}

export default hot(module)(App);
