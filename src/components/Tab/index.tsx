import classNames from 'classnames';
import {
  default as MuiTab,
  TabProps,
} from '@material-ui/core/Tab';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const Tab: React.FC<TabProps> = ({
  children,
  className,
  tabIndex = 0,
  ...props
}) => (
  <MuiTab
    className={classNames(
      builtIns['tab'],
      'tab',
      className,
    )}

    tabIndex={tabIndex}

    {...props}
  >
    {children}
  </MuiTab>
);
