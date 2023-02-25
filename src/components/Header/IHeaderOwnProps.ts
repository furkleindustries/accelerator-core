import type {
  AriaAttributes,
  HTMLAttributes,
  RefAttributes,
} from 'react';

export interface IHeaderOwnProps
  extends
    AriaAttributes,
    HTMLAttributes<HTMLElement>,
    RefAttributes<HTMLElement> {}
