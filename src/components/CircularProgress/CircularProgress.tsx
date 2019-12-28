import classNames from 'classnames';
import {
  ICircularProgressOwnProps,
} from './ICircularProgressOwnProps';
import MuiCircularProgress from '@material-ui/core/CircularProgress';

import * as React from 'react';

import styles from './index.less';

export const CircularProgress: React.FunctionComponent<ICircularProgressOwnProps> = ({
  className,
  ...props
}) => (
  <MuiCircularProgress
    {...props}
    className={classNames(
      styles.circularProgress,
      'circularProgress',
      className,
    )}
  />
);
