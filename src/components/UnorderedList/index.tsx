import {
  IListOwnProps,
} from '../List/IListOwnProps';
import {
  List,
} from '../List';

import * as React from 'react';

export const UnorderedList: React.FunctionComponent = ({
  children,
  ...props
}: IListOwnProps) => ( 
  <List {...props}>{children}</List>
);
