import {
  PassageContainer,
} from '../PassageContainer/PassageContainer';

import * as React from 'react';

// @ts-ignore
import _styles from './App.scss';
const styles = _styles || {};

export class App extends React.Component {
  public render() {
    return (
      <div className={`${styles.app} app`}>
        <PassageContainer />
      </div>
    );
  }
}
