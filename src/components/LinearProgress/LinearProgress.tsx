import classNames from 'classnames';
import {
  ILinearProgressOwnProps,
} from './ILinearProgressOwnProps';
import MuiLinearProgress from '@material-ui/core/LinearProgress';

import * as React from 'react';

import styles from './index.less';

export const LinearProgress: React.FunctionComponent<ILinearProgressOwnProps> = ({
  className,
  ...props
}) => (
  <MuiLinearProgress 
    {...props}
    className={classNames(
      styles.linearProgress,
      'linearProgress',
      className,
    )}
  />
);
