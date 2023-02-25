import classNames from 'classnames';
import {
  IListItemProps,
} from './IListItemProps';
import MuiListItem from '@material-ui/core/ListItem';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const ListItem: React.FC<IListItemProps> = ({
  button: _unused,
  children,
  className,
  role,
  ...props
}) => (
  <MuiListItem
    {...props}

    className={classNames(
      builtIns['list-item'],
      'list-item',
      className,
    )}

    role={role || 'listitem'}
  >
    {children}
  </MuiListItem>
);
