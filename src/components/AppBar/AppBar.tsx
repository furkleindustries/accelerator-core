import classNames from 'classnames';
import {
  IAppBarOwnProps,
} from './IAppBarOwnProps';
import MuiAppBar from '@material-ui/core/AppBar';

import * as React from 'react';

import styles from './index.less';

export const AppBar: React.FunctionComponent<IAppBarOwnProps> = ({
  className,
  ...props
}) => (
  <MuiAppBar
    {...props}
    className={classNames(
      styles.appBar,
      'appBar',
      className,
    )}
  />
);
