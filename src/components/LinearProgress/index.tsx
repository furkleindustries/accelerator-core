import classNames from 'classnames';
import {
  ILinearProgressOwnProps,
} from './ILinearProgressOwnProps';
import MuiLinearProgress from '@material-ui/core/LinearProgress';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const LinearProgress: React.FC<ILinearProgressOwnProps> = ({
  className,
  ...props
}) => (
  <MuiLinearProgress 
    {...props}

    className={classNames(
      builtIns['linear-progress'],
      'linear-progress',
      className,
    )}
  />
);
