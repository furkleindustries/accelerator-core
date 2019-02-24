import {
  classNameSafeAppend,
} from '../../functions/classNameSafeAppend';
import {
  IToolbarOwnProps,
} from './IToolbarOwnProps';
import MuiToolbar from '@material-ui/core/Toolbar';

import * as React from 'react';

import styles from './Toolbar.scss';

export const Toolbar: React.FunctionComponent<IToolbarOwnProps> = (props) => (
  <MuiToolbar {...{
    ...props,
    className: classNameSafeAppend(
      props.className,
      `${styles.toolbar} toolbar`,
    ),
  }} />
);
