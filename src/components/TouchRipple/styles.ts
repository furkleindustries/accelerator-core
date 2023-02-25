// @ts-nocheck
export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
  },
  /* Styles applied to the internal `Ripple` components `ripple` class. */
  ripple: {
    opacity: 0,
    position: 'absolute',
  },
  /* Styles applied to the internal `Ripple` components `rippleVisible` class. */
  rippleVisible: {
    opacity: 0.3,
    transform: 'scale(1)',
    animation: `$enter ${DURATION}ms ${theme.transitions.easing.easeInOut}`,
  },
  /* Styles applied to the internal `Ripple` components `ripplePulsate` class. */
  ripplePulsate: {
    animationDuration: `${theme.transitions.duration.shorter}ms`,
  },
  /* Styles applied to the internal `Ripple` components `child` class. */
  child: {
    opacity: 1,
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  /* Styles applied to the internal `Ripple` components `childLeaving` class. */
  childLeaving: {
    opacity: 0,
    animation: `$exit ${DURATION}ms ${theme.transitions.easing.easeInOut}`,
  },
  /* Styles applied to the internal `Ripple` components `childPulsate` class. */
  childPulsate: {
    position: 'absolute',
    left: 0,
    top: 0,
    animation: `$pulsate 2500ms ${theme.transitions.easing.easeInOut} 200ms infinite`,
  },
  '@keyframes enter': {
    '0%': {
      transform: 'scale(0)',
      opacity: 0.1,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 0.3,
    },
  },
  '@keyframes exit': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
  '@keyframes pulsate': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(0.92)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
});
