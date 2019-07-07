import classnames from 'classnames';
import {
  IListOwnProps,
} from './IListOwnProps';
import MuiList from '@material-ui/core/List';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiListSubheader from '@material-ui/core/ListSubheader';

import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';

export const List: React.FunctionComponent<IListOwnProps> = ({
  children,
  className,
  component,
  dontWrapInListItem,
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

    {children.map((child, key) => {
      const theComponent = component || ListItem;
      return React.createElement(
        theComponent,
        {
          key,
          ...listItemProps,
        },
        <MuiListItemText {...listItemTextProps}>
          {child}
        </MuiListItemText>
      );
    })}
  </MuiList>
);
