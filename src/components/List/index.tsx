import classNames from 'classnames';
import {
  IListOwnProps,
} from './IListOwnProps';
import MuiList from '@material-ui/core/List';
import MuiListSubheader from '@material-ui/core/ListSubheader';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const List: React.FC<IListOwnProps> = ({
  children,
  className,
  dontWrapInListItem,
  listItemProps = {},
  ordered,
  role,
  subheader,
  subheaderProps = {},
  ...props
}) => (
  <MuiList
    className={classNames(
      builtIns.list,
      'list',
      className,
      {
        [builtIns['ordered-list']]: ordered,
        orderedList: ordered,
      },
    )}

    role={role || 'list'}

    {...props}
  >
    {subheader ?
      <MuiListSubheader {...subheaderProps}>{subheader}</MuiListSubheader> :
      null}

    {React.Children.toArray(children)
      .filter(React.isValidElement)
      .map((child, key) => React.cloneElement(
        child,
        {
          key,
          ...{
            ...listItemProps,
            role: listItemProps.role ? listItemProps.role : 'listitem', 
          },
        },
      ))}
  </MuiList>
);
