import {
  classNameSafeAppend,
} from '../../functions/classNameSafeAppend';
import {
  ILinearProgressOwnProps,
} from './ILinearProgressOwnProps';
import MuiLinearProgress from '@material-ui/core/LinearProgress';

import * as React from 'react';

import styles from './LinearProgress.scss';

export const LinearProgress: React.FunctionComponent<ILinearProgressOwnProps> = (props) => (
  <MuiLinearProgress {...{
    ...props,
    className: classNameSafeAppend(
      props.className,
      `${styles.linearProgress} linearProgress`,
    ),
  }} />
);
