import classNames from 'classnames';
import {
  ITouchRippleOwnProps,
} from './ITouchRippleOwnProps';
import {
  Ripple,
} from '../Ripple';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import * as React from 'react';

export const TouchRipple = React.memo<ITouchRippleOwnProps>(
  React.forwardRef(({
      center: centerProp = false,
      duration = 6000,
      classes,
      className,
      ...other
    },

    ref,
  ) => {
    const [ ripples, setRipples ] = React.useState<React.ReactElement[]>([]);
    const nextKey = React.useRef(0);
    const rippleCallback = React.useRef<any>(null);

    React.useEffect(
      () => {
        if (typeof rippleCallback.current === 'function') {
          (rippleCallback as any).current();
          rippleCallback.current = null;
        }
      },

      [ ripples ],
    );

    // Used to filter out mouse emulated events on mobile.
    const ignoringMouseDown = React.useRef(false);
    // We use a timer in order to only show the ripples for touch "click" like events.
    // We don't want to display the ripple for touch scroll events.
    const startTimer = React.useRef<any>(null);

    // This is the hook called once the previous timeout is ready.
    const startTimerCommit = React.useRef<any>(null);
    const container = React.useRef<any>(null);

    React.useEffect(() => (
      () => clearTimeout(startTimer.current)
    ));

    const startCommit = React.useCallback(
      (params) => {
        const { pulsate, rippleX, rippleY, rippleSize, cb } = params;

        setRipples((oldRipples) => [
          ...oldRipples,
          <Ripple
            key={nextKey.current}
            timeout={duration}
            pulsate={pulsate}
            rippleX={rippleX}
            rippleY={rippleY}
            rippleSize={rippleSize}
          />,
        ]);
        nextKey.current += 1;
        rippleCallback.current = cb;
      },

      [ classes ],
    );

    const start = React.useCallback(
      (event = {}, options = {}, cb?) => {
        const {
          pulsate = false,
          center = centerProp || options.pulsate,
        } = options;

        if (event.type === 'mousedown' && ignoringMouseDown.current) {
          ignoringMouseDown.current = false;
          return;
        }

        if (event.type === 'touchstart') {
          ignoringMouseDown.current = true;
        }

        const element = container.current;
        const rect = element ?
          element.getBoundingClientRect() :
          {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
          };

        // Get the size of the ripple
        let rippleX: number;
        let rippleY: number;
        let rippleSize: number;

        if (center ||
          (event.clientX === 0 && event.clientY === 0) ||
          (!event.clientX && !event.touches))
        {
          rippleX = Math.round(rect.width / 2);
          rippleY = Math.round(rect.height / 2);
        } else {
          const {
            clientX,
            clientY,
          } = event.touches ? event.touches[0] : event;

          rippleX = Math.round(clientX - rect.left);
          rippleY = Math.round(clientY - rect.top);
        }

        if (center) {
          rippleSize = Math.sqrt(
            (2 * rect.width ** 2 + rect.height ** 2) / 3
          );

          // For some reason the animation is broken on Mobile Chrome if the size if even.
          if (rippleSize % 2 === 0) {
            rippleSize += 1;
          }
        } else {
          const sizeX =
            Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
          const sizeY =
            Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
          rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
        }

        // Touch devices
        if (event.touches) {
          // check that this isn't another touchstart due to multitouch
          // otherwise we will only clear a single timer when unmounting while two
          // are running
          if (startTimerCommit.current === null) {
            // Prepare the ripple effect.
            startTimerCommit.current = () => {
              startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
            };

            // Delay the execution of the ripple effect.
            startTimer.current = setTimeout(() => {
              if (startTimerCommit.current) {
                startTimerCommit.current();
                startTimerCommit.current = null;
              }
            }, 5); // We have to make a tradeoff with this value.
          }
        } else {
          startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
        }
      },

      [
        centerProp,
        startCommit,
      ],
    );

    const pulsate = React.useCallback(
      () => start({}, { pulsate: true }),
      [ start ],
    );

    const stop = React.useCallback((event, cb) => {
      clearTimeout(startTimer.current);

      // The touch interaction occurs too quickly.
      // We still want to show ripple effect.
      if (event.type === 'touchend' && startTimerCommit.current) {
        event.persist();

        startTimerCommit.current();
        startTimerCommit.current = null;
        startTimer.current = setTimeout(() => {
          stop(event, cb);
        });

        return;
      }

      startTimerCommit.current = null;

      setRipples((oldRipples) => {
        if (oldRipples.length > 0) {
          return oldRipples.slice(1);
        }
        return oldRipples;
      });

      rippleCallback.current = cb;
    }, []);

    React.useImperativeHandle(
      ref,

      () => ({
        pulsate,
        start,
        stop,
      }),

      [
        pulsate,
        start,
        stop,
      ],
    );

    return (
      <span
        {...other}

        className={classNames('ripple-root', className)}
        role="presentation"
        ref={container}
      >
        <TransitionGroup
          component={null}
          exit={true}
        >
          {ripples}
        </TransitionGroup>
      </span>
    );
  })
);

TouchRipple.displayName = 'TouchRipple';
