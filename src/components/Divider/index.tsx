import classNames from 'classnames';
import MuiDivider from '@material-ui/core/Divider';
import {
  IDividerOwnProps,
} from './IDividerOwnProps';

import * as React from 'react';

export const Divider: React.FunctionComponent<IDividerOwnProps> = ({
  children,
  className,
  ...props
}) => (
  <MuiDivider
    {...props}
    className={classNames('divider', className)}
  >
    {children}
  </MuiDivider>
);
