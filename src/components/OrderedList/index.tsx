import {
  IListOwnProps,
} from '../List/IListOwnProps';
import {
  List,
} from '@material-ui/core';

import * as React from 'react';

export const OrderedList: React.FunctionComponent = ({
  children,
  ...props
}: IListOwnProps) => (
  <List {...props}>
    {children}
  </List>
);
