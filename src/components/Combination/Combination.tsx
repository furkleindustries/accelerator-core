import {
  ICombinationOwnProps,
} from './ICombinationOwnProps';
import {
  NOf,
} from '../NOf';

import * as React from 'react';

export const Combination = ({
  pick,
  children,
}: ICombinationOwnProps) =>
(
  <NOf
    n={(pick || (pick && typeof pick === 'number') || pick === 0) ?
      pick :
      children.length}
  >
    {children}
  </NOf>
);
