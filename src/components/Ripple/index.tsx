import classNames from 'classnames';
import {
  IRippleOwnProps,
} from './IRippleOwnProps';
import {
  useEventCallback,
} from './useEventCallback';

import * as React from 'react';

export const Ripple = (props: IRippleOwnProps) => {
  const {
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited = () => {},
    timeout,
  } = props;

  const [
    leaving,
    setLeaving,
  ] = React.useState(false);

  const safeRippleSize = rippleSize || 0;
  const rippleStyles = {
    width: safeRippleSize,
    height: safeRippleSize,
    top: safeRippleSize / -2 + rippleY,
    left: safeRippleSize / -2 + rippleX,
  };

  const handleExited = useEventCallback(onExited);
  
  // Ripple is used for user feedback (e.g. click or press) so we want to apply styles with the highest priority
  React.useLayoutEffect(
    () => {
      if (!inProp) {
        setLeaving(true);
        const timeoutId = setTimeout(handleExited, timeout);
        return () => clearTimeout(timeoutId);
      }

      return undefined;
    },

    [
      handleExited,
      inProp,
      timeout,
    ],
  );

  return (
    <span
      className={classNames(
        'ripple',
        'rippleVisible',
        { ripplePulsate: pulsate },
      )}

      style={rippleStyles}
    >
      <span
        className={classNames(
          'child',

          {
            childLeaving: leaving,
            childPulsate: pulsate,
          },
        )}
      ></span>
    </span>
  );
};
