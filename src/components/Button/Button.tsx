import {
  classNameSafeAppend,
} from '../../functions/classNameSafeAppend';
import {
  IButtonProps,
} from './IButtonProps';
import {
  Button as MuiButton,
} from '@material-ui/core';

import * as React from 'react';

import styles from './Button.scss';

export const Button: React.FunctionComponent<IButtonProps> = (props) => (
  <MuiButton {...{
    ...props,
    className: classNameSafeAppend(
      props.className,
      `${styles.button} button`,
    ),
  }} />
);
