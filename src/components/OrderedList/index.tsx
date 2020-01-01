import {
  IListOwnProps,
} from '../List';
import {
  List,
} from '@material-ui/core';

import * as React from 'react';

export const OrderedList: React.FunctionComponent = ({
  children,
  ...props
}: IListOwnProps) => (
  <List {...props}>{children}</List>
);
