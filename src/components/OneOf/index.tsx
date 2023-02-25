import {
  IOneOfOwnProps,
} from './IOneOfOwnProps';
import {
  NOf
} from '../NOf';

import * as React from 'react';

export const OneOf: React.FC<IOneOfOwnProps> = ({ children }) => (
  <NOf n={1}>
    {children}
  </NOf>
);
