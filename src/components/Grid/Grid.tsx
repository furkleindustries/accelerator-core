import classNames from 'classnames';
import {
  IGridOwnProps,
} from './IGridOwnProps';
import MuiGrid from '@material-ui/core/Grid';

import * as React from 'react';

export const Grid: React.FunctionComponent<IGridOwnProps> = ({
  children,
  className,
  ...props
}) => (
  <MuiGrid
    {...props}
    className={classNames('grid', className)}
  >
    {children}
  </MuiGrid>
);
