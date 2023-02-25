import * as React from 'react';

export const useEventCallback = (fn: (...args: any[]) => any) => {
  const ref = React.useRef(fn);
  React.useLayoutEffect(() => ref.current = fn);
  return React.useCallback((...args) => ref.current(...args), []);
};
