import type {
  AriaAttributes,
  HTMLAttributes,
  RefAttributes,
} from 'react';

export interface IFooterOwnProps
  extends
    AriaAttributes,
    HTMLAttributes<HTMLElement>,
    RefAttributes<HTMLElement> {};
