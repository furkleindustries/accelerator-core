import {
  ReactNodeArray,
} from 'react';

export interface INOfOwnProps {
  readonly children: ReactNodeArray;
  readonly n: number;
  readonly shuffle?: boolean;
}
