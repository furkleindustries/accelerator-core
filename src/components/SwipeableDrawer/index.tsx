import classNames from 'classnames';
import {
  default as MuiSwipeableDrawer,
  SwipeableDrawerProps,
} from '@material-ui/core/SwipeableDrawer';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const SwipeableDrawer: React.FC<SwipeableDrawerProps> = ({
  children,
  className,
  ...props
}) => (
  <MuiSwipeableDrawer
    className={classNames(
      builtIns['swipeable-drawer'],
      'swipeable-drawer',
      className,
    )}

    {...props}
  >
    {children}
  </MuiSwipeableDrawer>
);
