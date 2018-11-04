import {
  PassageContentsContainerConnected,
} from '../PassageContentsContainer/PassageContentsContainer';
import {
  PassageFooters,
} from '../PassageFooters/PassageFooters';
import {
  PassageHeaders,
} from '../PassageHeaders/PassageHeaders';
import {
  PassagePluginsWrapperConnected,
} from '../PassagePluginsWrapper/PassagePluginsWrapper';

import * as React from 'react';

// @ts-ignore
import _styles from './PassageContainer.scss';
const styles = _styles || {};

export class PassageContainer extends React.PureComponent {
  public render() {
    return (
      <div className={`${styles.passageContainer} passageContainer`}>
        <PassagePluginsWrapperConnected>
          <PassageHeaders />

          <PassageContentsContainerConnected />

          <PassageFooters />
        </PassagePluginsWrapperConnected>
      </div>
    );
  }
}
