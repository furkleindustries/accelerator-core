import classNames from 'classnames';
import {
  IPaperProps,
} from './IPaperProps';
import MuiPaper from '@material-ui/core/Paper'

import * as React from 'react';

export const Paper: React.FunctionComponent<IPaperProps> = ({
  children,
  className,
  ...props
}) => (
  <MuiPaper
    {...props}
    className={classNames('paper', className)}
  >
    {children}
  </MuiPaper>
);
