import classNames from 'classnames';
import {
  ICheckboxOwnProps,
} from './ICheckboxOwnProps';
import MuiCheckbox from '@material-ui/core/Checkbox';

import * as React from 'react';

import styles from './index.less';

export const Checkbox: React.FunctionComponent<ICheckboxOwnProps> = ({
  className,
  ...props
}) => (
  <MuiCheckbox
    {...props}
    className={classNames(
      styles.checkbox,
      'checkbox',
      className,
    )}
  />
);
