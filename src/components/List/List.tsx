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
      const theComponent = component || ListItem;

      if (!component &&
          (React.isValidElement(child) && child.type === 'li'))
      {
        /* Replace the li rather than containing it inside another li. */ 
        const {
          children: childChildren,
          ...childProps
        } = child.props;

        return (
          <ListItem {...childProps}>
            {childChildren}
          </ListItem>
        );
      }

      return React.createElement(
        theComponent,
        {
          key,
          ...listItemProps,
        },
        <ListItem>
          {child}
        </ListItem>,
      );
    })}
  </MuiList>
);
