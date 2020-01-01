import {
  InkMutatorProps,
} from './InkMutatorProps';
import {
  ReactNode,
} from 'react';

export interface InkMutator {
  (args: InkMutatorProps): ReactNode;
}
