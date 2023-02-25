import classNames from 'classnames';
import MuiDivider from '@material-ui/core/Divider';
import {
  IDividerOwnProps,
} from './IDividerOwnProps';

import * as React from 'react';

export const Divider: React.FC<IDividerOwnProps> = ({
  children,
  className,
  role,
  ...props
}) => (
  <MuiDivider
    {...props}

    className={classNames('divider', className)}
    role={role || 'separator'}
  >
    {children}
  </MuiDivider>
);
