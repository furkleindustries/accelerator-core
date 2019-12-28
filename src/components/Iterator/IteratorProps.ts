import {
  ReactElement,
  ReactNode,
} from 'react';

export interface IteratorProps {
  readonly collection: ReactNode[];
  readonly children: ReactElement;
  readonly mapper?: (child: ReactNode) => ReactNode;
  readonly filter?: (child: ReactNode) => boolean;
}
