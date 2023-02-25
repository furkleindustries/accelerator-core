import type {
  ReactNode,
} from 'react';

export type ReactNodeWithoutNullOrUndefined = Exclude<
  ReactNode,
  null | null[] | undefined | undefined[]
>;
