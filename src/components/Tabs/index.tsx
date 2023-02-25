import classNames from 'classnames';
import {
  default as MuiTabs,
  TabsProps,
} from '@material-ui/core/Tabs';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const Tabs: React.FC<TabsProps> = ({
  children,
  className,
  ...props
}) => (
  <MuiTabs
    className={classNames(
      builtIns['tabs'],
      'tabs',
      className,
    )}

    {...props}
  >
    {children}
  </MuiTabs>
);
