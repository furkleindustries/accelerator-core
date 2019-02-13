import {
  AppContextProviderWrapper,
} from '../AppContextProviderWrapper/AppContextProviderWrapper';
import {
  CssBaseline,
} from '@material-ui/core';
import {
  PassageContainerConnected,
} from '../PassageContainer/PassageContainer';
import {
  hot,
} from 'react-hot-loader';

import * as React from 'react';

import styles from './App.scss';

export class App extends React.PureComponent {
  public render() {
    return (
      <div className={`${styles.app} app`}>
        <CssBaseline />
        <AppContextProviderWrapper>
          <PassageContainerConnected />
        </AppContextProviderWrapper>
      </div>
    );
  }
}

export default hot(module)(App);
