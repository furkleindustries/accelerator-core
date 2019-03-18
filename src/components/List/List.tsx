import classnames from 'classnames';
import {
  IListOwnProps,
} from './IListOwnProps';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiListSubheader from '@material-ui/core/ListSubheader';

import * as React from 'react';

export const List: React.FunctionComponent<IListOwnProps> = ({
  children,
  className,
  listItemProps,
  listItemTextProps,
  subheader,
  subheaderProps,
  ...props
}) => (
  <MuiList
    {...props}
    className={classnames('list', className)}
  >
    {subheader ?
      <MuiListSubheader {...subheaderProps}>{subheader}</MuiListSubheader> :
      null}

    {children.map((child) => (
      <MuiListItem {...listItemProps}>
        <MuiListItemText {...listItemTextProps}>
          {child}
        </MuiListItemText>
      </MuiListItem>
    ))}
  </MuiList>
);
