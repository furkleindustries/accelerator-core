import {
  OneOrArray,
} from '../../typeAliases/OneOrArray';
import {
  ReactElement,
  ReactNode,
} from 'react';

export interface IteratorProps {
  readonly collection: ReactNode[];
  readonly children: OneOrArray<ReactElement>;
  readonly mapper?: (child: ReactNode) => ReactNode;
  readonly filter?: (child: ReactNode) => boolean;
}
