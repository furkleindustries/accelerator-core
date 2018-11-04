import {
  getFootersList,
} from '../../passages/getFootersList';
import {
  IFooter,
} from '../../passages/IFooter';

import * as React from 'react';

// @ts-ignore
import _styles from './PassageFooters.scss';
const styles = _styles || {};

export class PassageFooters extends React.PureComponent {
  public render() {
    const footers: IFooter[] = getFootersList();
    return (
      <div className={`${styles.passageFooters} passageFooters`}>
        {footers}
      </div>
    );
  }
}

export default PassageFooters;
