import type {
  ReactChildren,
} from 'react';

export interface IfProps {
  readonly condition:
    string |
    number |
    object |
    ((child: any) => string | number | object);

  readonly children: ReactChildren;
}
