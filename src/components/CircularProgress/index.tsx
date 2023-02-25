import classNames from 'classnames';
import {
  ICircularProgressOwnProps,
} from './ICircularProgressOwnProps';
import MuiCircularProgress from '@material-ui/core/CircularProgress';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const CircularProgress: React.FC<ICircularProgressOwnProps> = ({
  className,
  ...props
}) => (
  <MuiCircularProgress
    {...props}

    className={classNames(
      builtIns['circular-progress'],
      'circular-progress',
      className,
    )}
  />
);
