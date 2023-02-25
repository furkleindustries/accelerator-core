import {
  setRef,
} from './setRef';

import * as React from 'react';

export const useForkRef = <T extends any>(
  refA: React.MutableRefObject<T>,
  refB: React.MutableRefObject<T>,
) => (
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  React.useMemo(
    () => {
      if (refA == null && refB == null) {
        return null;
      }

      return (refValue: T) => {
        setRef(refA, refValue);
        setRef(refB, refValue);
      };
    },

    [
      refA,
      refB,
    ],
  )
);
