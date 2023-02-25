import classNames from 'classnames';
import {
  IToolbarOwnProps,
} from './IToolbarOwnProps';
import MuiToolbar from '@material-ui/core/Toolbar';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const Toolbar: React.FC<IToolbarOwnProps> = ({
  children,
  className,
  ...props
}) => (
  <MuiToolbar
    {...props}

    className={classNames(
      builtIns.toolbar,
      'toolbar',
      className,
    )}

    role="toolbar"
    aria-roledescription="toolbar"
  >
    {children}
  </MuiToolbar>
);
