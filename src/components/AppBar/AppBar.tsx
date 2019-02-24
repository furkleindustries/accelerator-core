import {
  classNameSafeAppend,
} from '../../functions/classNameSafeAppend';
import {
  IAppBarOwnProps,
} from './IAppBarOwnProps';
import MuiAppBar from '@material-ui/core/AppBar';

import * as React from 'react';

import styles from './AppBar.scss';

export const AppBar: React.FunctionComponent<IAppBarOwnProps> = (props) => (
  <MuiAppBar {...{
    ...props,
    className: classNameSafeAppend(
      props.className,
      `${styles.appBar} appBar`,
    ),
  }} />
);
