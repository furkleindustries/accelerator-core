import {
  classNameSafeAppend,
} from '../../functions/classNameSafeAppend';
import {
  ICircularProgressOwnProps,
} from './ICircularProgressOwnProps';
import MuiCircularProgress from '@material-ui/core/CircularProgress';

import * as React from 'react';

import styles from './CircularProgress.scss';

export const CircularProgress: React.FunctionComponent<ICircularProgressOwnProps> = (props) => (
  <MuiCircularProgress {...{
    ...props,
    className: classNameSafeAppend(
      props.className,
      `${styles.circularProgress} circularProgress`,
    ),
  }} />
);
