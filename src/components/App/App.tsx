import {
  IAppProps,
} from './IAppProps';
import {
  IState,
} from '../../reducers/IState';
import {
  PassageContainerConnected,
} from '../PassageContainer/PassageContainer';
import {
  connect,
  MapStateToProps,
} from 'react-redux';

import * as React from 'react';

// @ts-ignore
import _styles from './App.scss';
const styles = _styles || {};

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage could be found in the passages map with the name %NAME%.',

  NON_DISPLAY_PASSAGE_RENDERED:
    'A passage with the tag nonDisplay cannot be navigated to or rendered ' +
    'to the page. These passages should be used solely for importing.',
};

export class App extends React.Component<IAppProps> {
  public render() {
    const {
      currentPassage,
      storyState,
    } = this.props;

    return (
      <div className={`${styles.app} app`}>
        <PassageContainerConnected
          passage={currentPassage}
          storyState={storyState}
        />
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<IAppProps, {}, IState> = ({
  currentPassageName,
  passages,
  storyState,
}) => {
  if (!(currentPassageName in passages)) {
    const errStr = strings.PASSAGE_NOT_FOUND
      .replace('%NAME%', currentPassageName);

    throw new Error(errStr);
  }

  return {
    currentPassage: passages[currentPassageName],
    storyState,
  };
};

export const AppConnected = connect(mapStateToProps)(App);

export default App;
