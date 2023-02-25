import classNames from 'classnames';
import {
  ISwipeableOwnProps,
} from './ISwipeableOwnProps';
import {
  useSwipeable,
  SwipeableOptions,
} from 'react-swipeable';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const Swipeable: React.FC<
  ISwipeableOwnProps & SwipeableOptions
> = ({
  children,
  className,
  delta = 0,                              // min distance(px) before a swipe starts
  preventDefaultTouchmoveEvent = false,   // preventDefault on touchmove, *See Details*
  trackTouch = true,                      // track touch input
  trackMouse = false,                     // track mouse input
  onSwiped,
  onSwipedLeft,
  onSwipedRight,
  onSwipedDown,
  onSwipedUp,
  onSwiping,
  style,
}) => {
  const handlers = useSwipeable({
    delta,
    onSwiped,
    onSwipedDown,
    onSwipedLeft,
    onSwipedRight,
    onSwipedUp,
    onSwiping,
    preventDefaultTouchmoveEvent,
    trackMouse,
    trackTouch,
  });

  return (
    <div
      {...handlers}

      className={classNames(
        builtIns['swipeable'],
        'swipeable',
        className,
      )}

      role="group"
      style={style}
    >
      {children}
    </div>
  );
}