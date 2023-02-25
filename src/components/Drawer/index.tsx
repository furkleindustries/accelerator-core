import classNames from 'classnames';
import {
  default as MuiDrawer,
  DrawerProps,
} from '@material-ui/core/Drawer';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const Drawer: React.FC<DrawerProps> = ({
  children,
  className,
  ...props
}) => (
  <MuiDrawer
    className={classNames(
      builtIns.drawer,
      'drawer',
      className,
    )}

    {...props}
  >
    {children}
  </MuiDrawer>
);
