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
    return (
      <div className={`${styles.app} app`}>
        <PassageContainerConnected />
      </div>
    );
  }
}

export default hot(module)(App);
