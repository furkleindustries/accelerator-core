import classNames from 'classnames';
import {
  IButtonProps,
} from './IButtonProps';
import {
  Button as MuiButton,
} from '@material-ui/core';

import * as React from 'react';

import styles from './index.less';

export const Button: React.FunctionComponent<IButtonProps> = ({
  children,
  className,
  color = 'primary',
  ...props
}) => (
  <MuiButton
    {...props}
    className={classNames(
      styles.button,
      'button',
      className,
    )}

    color={color}
  >
    {children}
  </MuiButton>
);
