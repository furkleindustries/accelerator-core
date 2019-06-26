import classnames from 'classnames';
import {
  ICheckboxOwnProps,
} from './ICheckboxOwnProps';
import MuiCheckbox from '@material-ui/core/Checkbox';

import * as React from 'react';

import styles from './Checkbox.less';

export const Checkbox: React.FunctionComponent<ICheckboxOwnProps> = (props) => (
  <MuiCheckbox {...{
    ...props,
    className: classnames(
      'checkbox',
      styles.checkbox,
      props.className,
    ),
  }} />
);
