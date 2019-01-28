import {
  PassageContainerConnected,
} from '../PassageContainer/PassageContainer';
import {
  hot,
} from 'react-hot-loader';

import * as React from 'react';

// @ts-ignore
import _styles from './App.scss';
const styles = _styles || {};

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
