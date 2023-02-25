import {
  FadeProps,
} from '@material-ui/core';
import {
  duration,
} from '@material-ui/core/styles/transitions';
import useTheme from '@material-ui/core/styles/useTheme';
import useForkRef from '@material-ui/core/utils/useForkRef';
import {
  reflow,
  getTransitionProps,
// @ts-ignore
} from '@material-ui/core/transitions/utils';
import {
  Transition,
} from 'react-transition-group';

import * as React from 'react';

const styles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
};

const defaultTimeout = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen,
};

export const Fade = React.forwardRef((props: FadeProps, ref) => {
  const {
    children,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
  } = props;

  const theme = useTheme();

  const nodeRef = React.useRef(null);
  const foreignRef = useForkRef((children as any).ref, ref);
  const handleRef = useForkRef(nodeRef, foreignRef);

  const normalizedTransitionCallback = (callback?: (...args: any[]) => any) => (
    (maybeIsAppearing: boolean) => {
      if (typeof callback === 'function') {
        const node = nodeRef.current;

        // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
        if (maybeIsAppearing === undefined) {
          callback(node);
        } else {
          callback(node, maybeIsAppearing);
        }
      }
    }
  );

  const handleEntering = normalizedTransitionCallback(onEntering);

  const handleEnter = normalizedTransitionCallback((
    node: HTMLElement,
    isAppearing: boolean,
  ) => {
    reflow(node);

    const transitionProps = getTransitionProps(
      { style, timeout },
      {
        mode: 'enter',
      },
    );

    node.style.transition = theme.transitions.create('opacity', transitionProps);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });

  const handleEntered = normalizedTransitionCallback(onEntered);

  const handleExiting = normalizedTransitionCallback(onExiting);

  const handleExit = normalizedTransitionCallback((node: HTMLElement) => {
    const transitionProps = getTransitionProps(
      {
        style,
        timeout,
      },

      { mode: 'exit' },
    );

    node.style.transition = theme.transitions.create('opacity', transitionProps);

    if (onExit) {
      onExit(node);
    }
  });

  const handleExited = normalizedTransitionCallback(onExited);

  return (
    <Transition
      appear={true}
      in={inProp}
      nodeRef={nodeRef}
      onEnter={handleEnter as any}
      onEntered={handleEntered as any}
      onEntering={handleEntering as any}
      onExit={handleExit as any}
      onExited={handleExited as any}
      onExiting={handleExiting as any}
      role="presentation"
      timeout={timeout}
    >
      {(state: any, childProps: any) => {
        return React.cloneElement(children!, {
          style: {
            opacity: 0,
            visibility: state === 'exited' && !inProp ? 'hidden' : 'visible',
            ...styles[state],
            ...style,
            ...children!.props.style,
          },

          ref: handleRef,
          role: 'presentation',
          tabIndex: -1,
          ...childProps,
        });
      }}
    </Transition>
  );
});
