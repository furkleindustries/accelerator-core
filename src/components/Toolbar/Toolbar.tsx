import classnames from 'classnames';
import {
  IToolbarOwnProps,
} from './IToolbarOwnProps';
import MuiToolbar from '@material-ui/core/Toolbar';

import * as React from 'react';

import styles from './Toolbar.scss';

export const Toolbar: React.FunctionComponent<IToolbarOwnProps> = ({
  children,
  className,
  ...props
}) => (
  <MuiToolbar {...{
    ...props,
    className: classnames(
      'toolbar',
      styles.toolbar,
      className,
    ),
  }}>
    {children}
  </MuiToolbar>
);
