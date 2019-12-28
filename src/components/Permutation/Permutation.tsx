import {
  IPermutationOwnProps,
} from './IPermutationOwnProps';
import {
  NOf,
} from '../NOf';

import * as React from 'react';

export const Permutation = ({
  pick,
  children,
}: IPermutationOwnProps) =>
(
  <NOf
    n={pick || children.length}
    shuffle={true}
  >
    {children}
  </NOf>
);
