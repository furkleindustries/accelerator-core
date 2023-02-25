import {
  IListOwnProps,
} from '../List/IListOwnProps';
import {
  List,
} from '../List';

import * as React from 'react';

export const OrderedList: React.FC = ({
  children,
  ...props
}: Omit<IListOwnProps, 'ordered'>) => (
  <List
    {...props}
    ordered={true}
  >
    {children}
  </List>
);
