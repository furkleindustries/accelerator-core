import {
  getHeadersList,
} from '../../passages/getHeadersList';
import {
  IHeader,
} from '../../passages/IHeader';

import * as React from 'react';

// @ts-ignore
import _styles from './PassageHeaders.scss';
const styles = _styles || {};

export class PassageHeaders extends React.PureComponent {
  public render() {
    const headers: IHeader[] = getHeadersList();
    return (
      <div className={`${styles.passageHeaders} passageHeaders`}>
        {headers}
      </div>
    );
  }
}

export default PassageHeaders;
