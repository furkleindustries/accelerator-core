import classNames from 'classnames';
import {
  IAppBarOwnProps,
} from './IAppBarOwnProps';
import MuiAppBar from '@material-ui/core/AppBar';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const AppBar: React.FC<IAppBarOwnProps> = ({
  className,
  children,
  innerRef,
  ...props
}) => (
  <MuiAppBar
    {...props}

    className={classNames(
      builtIns['app-bar'],
      'app-bar',
    )}

    role="menubar"
    aria-roledescription="menubar"
  >
    {children}
  </MuiAppBar>
);
