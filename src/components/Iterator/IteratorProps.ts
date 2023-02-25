import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray'
import type {
  ReactElement,
  ReactNode,
} from 'react';

export interface IteratorProps {
  readonly collection: MaybeReadonlyArray<ReactNode>;
  readonly children: ReactElement | MaybeReadonlyArray<ReactElement>;
  readonly mapper?: (child: ReactNode) => ReactNode;
  readonly filter?: (child: ReactNode) => boolean;
}
