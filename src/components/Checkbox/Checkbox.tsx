import {
  classNameSafeAppend,
} from '../../functions/classNameSafeAppend';
import {
  ICheckboxOwnProps,
} from './ICheckboxOwnProps';
import MuiCheckbox from '@material-ui/core/Checkbox';

import * as React from 'react';

import styles from './Checkbox.scss';

export const Checkbox: React.FunctionComponent<ICheckboxOwnProps> = (props) => (
  <MuiCheckbox {...{
    ...props,
    className: classNameSafeAppend(
      props.className,
      `${styles.checkbox} checkbox`,
    ),
  }} />
);
