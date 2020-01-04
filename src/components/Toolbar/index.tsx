import classNames from 'classnames';
import {
  IToolbarOwnProps,
} from './IToolbarOwnProps';
import MuiToolbar from '@material-ui/core/Toolbar';

import * as React from 'react';

import styles from './index.less';

export const Toolbar: React.FunctionComponent<IToolbarOwnProps> = ({
  children,
  className,
  ...props
}) => (
  <MuiToolbar
    {...props}
    className={classNames(
      'toolbar',
      styles.toolbar,
      className,
    )}
  >
    {children}
  </MuiToolbar>
);
