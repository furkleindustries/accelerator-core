import {
  IPermutationOwnProps,
} from './ICombinationOwnProps';
import {
  NOf,
} from '../NOf/NOf';

import * as React from 'react';

export const Combination = ({
  pick,
  children,
}: IPermutationOwnProps) =>
(
  <NOf n={pick || children.length}>
    {children}
  </NOf>
);
