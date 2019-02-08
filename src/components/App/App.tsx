import {
  getSoundManagerContext,
} from '../../state/getSoundManagerContext';
import {
  PassageContainerConnected,
} from '../PassageContainer/PassageContainer';
import {
  hot,
} from 'react-hot-loader';
import {
  createManager,
} from 'sound-manager';

import * as React from 'react';

import styles from './App.scss';

export class App extends React.PureComponent {
  public render() {
    const soundManagerContext = getSoundManagerContext();
    return (
      <soundManagerContext.Provider value={{ soundManager: createManager() }}>
        <div className={`${styles.app} app`}>
          {
            // @ts-ignore
            <PassageContainerConnected />
          }
        </div>
      </soundManagerContext.Provider>
    );
  }
}

export default hot(module)(App);
