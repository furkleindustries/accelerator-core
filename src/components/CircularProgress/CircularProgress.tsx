import classnames from 'classnames';
import {
  ICircularProgressOwnProps,
} from './ICircularProgressOwnProps';
import MuiCircularProgress from '@material-ui/core/CircularProgress';

import * as React from 'react';

import styles from './CircularProgress.scss';

export const CircularProgress: React.FunctionComponent<ICircularProgressOwnProps> = (props) => (
  <MuiCircularProgress {...{
    ...props,
    className: classnames(
      'circularProgress',
      styles.circularProgress,
      props.className,
    ),
  }} />
);
