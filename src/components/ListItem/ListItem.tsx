import {
  IListItemProps,
} from './IListItemProps';
import MuiListItem from '@material-ui/core/ListItem';

import * as React from 'react';

export const ListItem: React.FunctionComponent<IListItemProps> = ({
  children,
  ...props
}) => (
  <MuiListItem {...props}>
    {children}
  </MuiListItem>
);
