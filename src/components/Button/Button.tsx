import classnames from 'classnames';
import {
  IButtonProps,
} from './IButtonProps';
import {
  Button as MuiButton,
} from '@material-ui/core';

import * as React from 'react';

import styles from './Button.scss';

export const Button: React.FunctionComponent<IButtonProps> = ({
  className,
  color = 'primary',
  ...props
}) => (
  <MuiButton
    {...props}
    className={classnames(
      'button',
      styles.button,
      className,
    )}
    color={color}
  />
);
