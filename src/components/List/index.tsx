import classNames from 'classnames';
import {
  IListOwnProps,
} from './IListOwnProps';
import {
  ListItem,
} from '../ListItem';
import MuiList from '@material-ui/core/List';
import MuiListSubheader from '@material-ui/core/ListSubheader';

import * as React from 'react';

export const List: React.FunctionComponent<IListOwnProps> = ({
  children,
  className,
  component,
  dontWrapInListItem,
  listItemProps,
  subheader,
  subheaderProps,
  ...props
}) => (
  <MuiList
    {...props}
    className={classNames('list', className)}
  >
    {subheader ?
      <MuiListSubheader {...subheaderProps}>{subheader}</MuiListSubheader> :
      null}

    {React.Children.toArray(children).map((child, key) => {
      if (component) {
        return React.createElement(
          component,
          {
            key,
            ...listItemProps,
          },
          child,
        );
      } else if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          key,
          ...listItemProps,
        });
      }

      return child;
    })}
  </MuiList>
);
