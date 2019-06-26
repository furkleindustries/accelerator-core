import classnames from 'classnames';
import {
  IAppBarOwnProps,
} from './IAppBarOwnProps';
import MuiAppBar from '@material-ui/core/AppBar';

import * as React from 'react';

import styles from './AppBar.less';

export const AppBar: React.FunctionComponent<IAppBarOwnProps> = (props) => (
  <MuiAppBar {...{
    ...props,
    className: classnames(
      'appBar',
      styles.appBar,
      props.className,
    ),
  }} />
);
