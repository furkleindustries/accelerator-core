import classNames from 'classnames';
import {
  IButtonBaseOwnProps,
} from './IButtonBaseOwnProps';
import {
  useEventCallback,
} from '../Ripple/useEventCallback';
import {
  useIsFocusVisible,
} from './useIsFocusVisible';
import {
  TouchRipple,
} from '../TouchRipple';
import {
  useForkRef,
} from './useForkRef';

import * as React from 'react';

import builtInStyles from '../../../passages/_global-styles/components/index.less';

export const ButtonBase = React.forwardRef(({
  action,
  centerRipple = false,
  children,
  classes,
  className,
  component = 'button',
  disabled = false,
  disableRipple = false,
  disableTouchRipple = false,
  focusRipple = false,
  focusVisibleClassName,
  onBlur,
  onClick,
  onFocus,
  onFocusVisible,
  onKeyDown,
  onKeyUp,
  onMouseDown,
  onMouseLeave,
  onMouseUp,
  onTouchEnd,
  onTouchMove,
  onTouchStart,
  onDragLeave,
  ref: buttonRefProp,
  role,
  tabIndex = 0,
  TouchRippleProps,
  timeout,
  type = 'button',
  ...other
}: IButtonBaseOwnProps, ref: React.MutableRefObject<HTMLButtonElement>) => {
  const buttonRef = React.useRef<any>(null);

  const rippleRef = React.useRef<any>(null);

  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  const [
    focusVisible,
    setFocusVisible,
  ] = React.useState(false);

  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  React.useEffect(
    () => {
      isFocusVisibleRef.current = focusVisible;
    },

    [
      focusVisible,
      isFocusVisibleRef,
    ],
  );

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        if (buttonRef && buttonRef.current) {
          buttonRef.current.focus();
        }
      },
    }),
    [],
  );

  React.useEffect(
    () => {
      if (focusVisible && focusRipple && !disableRipple) {
        rippleRef.current.pulsate();
      }
    },

    [
      disableRipple,
      focusRipple,
      focusVisible,
    ],
  );

  function useRippleHandler(rippleAction: any, eventCallback: any, skipRippleAction = disableTouchRipple) {
    return useEventCallback((event) => {
      if (!event) {
        return;
      }

      if (eventCallback) {
        eventCallback(event);
      }

      const ignore = skipRippleAction;
      if (!ignore && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }

      return true;
    });
  }

  const handleMouseDown = useRippleHandler('start', onMouseDown);
  const handleDragLeave = useRippleHandler('stop', onDragLeave);
  const handleMouseUp = useRippleHandler('stop', onMouseUp);
  const handleMouseLeave = useRippleHandler(
    'stop',
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (focusVisible) {
        event.preventDefault();
      }

      if (onMouseLeave && event) {
        onMouseLeave(event);
      }
    },
  );

  const handleTouchStart = useRippleHandler('start', onTouchStart);
  const handleTouchEnd = useRippleHandler('stop', onTouchEnd);
  const handleTouchMove = useRippleHandler('stop', onTouchMove);

  const handleBlur = useRippleHandler(
    'stop',
    (event: React.FocusEvent<HTMLButtonElement>) => {
      handleBlurVisible();
      if (isFocusVisibleRef.current === false) {
        setFocusVisible(false);
      }

      if (onBlur && event) {
        onBlur(event);
      }
    },

    false,
  );

  const handleFocus = useEventCallback((event) => {
    if (event) {
      // Fix for https://github.com/facebook/react/issues/7769
      if (!buttonRef.current) {
        buttonRef.current = event.currentTarget;
      }

      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setFocusVisible(true);

        if (onFocusVisible) {
          onFocusVisible(event);
        }
      }

      if (onFocus) {
        onFocus(event);
      }
    }
  });

  const isNonNativeButton = () => {
    return component && component !== 'button';
  };

  /**
   * IE 11 shim for https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat
   */
  const keydownRef = React.useRef(false);
  const handleKeyDown = useEventCallback((event) => {
    if (!event) {
      return;
    }

    // Check if key is already down to avoid repeats being counted as multiple activations
    if (focusRipple &&
      !keydownRef.current &&
      focusVisible &&
      rippleRef.current &&
      event.key === ' ')
    {
      keydownRef.current = true;
      event.persist();
      rippleRef.current.stop(event, () => {
        rippleRef.current.start(event);
      });
    }

    if (event.target === event.currentTarget && isNonNativeButton() && event.key === ' ') {
      event.preventDefault();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }

    // Keyboard accessibility for non interactive elements
    if (event.target === event.currentTarget &&
      isNonNativeButton() &&
      event.key === 'Enter' &&
      !disabled)
    {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      }
    }
  });

  const handleKeyUp = useEventCallback((event) => {
    if (!event) {
      return;
    }

    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0
    if (focusRipple &&
      event.key === ' ' &&
      rippleRef.current &&
      focusVisible &&
      !event.defaultPrevented)
    {
      keydownRef.current = false;
      event.persist();

      rippleRef.current.stop(event, () => {
        rippleRef.current.pulsate(event);
      });
    }

    if (onKeyUp) {
      onKeyUp(event);
    }

    // Keyboard accessibility for non interactive elements
    if (onClick &&
      event.target === event.currentTarget &&
      isNonNativeButton() &&
      event.key === ' ' &&
      !event.defaultPrevented)
    {
      onClick(event);
    }
  });

  const ComponentProp = component;
  const buttonProps: Record<string, any> = {};
  const handleUserRef = useForkRef(buttonRefProp as any, ref);
  const handleOwnRef = useForkRef(focusVisibleRef as any, buttonRef);
  const handleRef = useForkRef(handleUserRef as any, handleOwnRef as any);

  const [
    mountedState,
    setMountedState,
  ] = React.useState(false);

  React.useEffect(() => {
    setMountedState(true);
  }, []);

  const enableTouchRipple = mountedState && !disableRipple && !disabled;

  return (
    <ComponentProp
      className={classNames(
        'button-root',

        {
          [builtInStyles['disabled']]: disabled,
          ['focusVisible']: focusVisible,
          ...(focusVisibleClassName ?
            { [focusVisibleClassName]: focusVisible } :
            {}),
        },

        className,
      )}

      role={role || 'link'}
      aria-roledescription={other['aria-roledescription'] || 'Link button'}
      onBlur={handleBlur}
      onClick={onClick}
      onDragLeave={handleDragLeave}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      ref={handleRef}
      tabIndex={disabled ? -1 : tabIndex}

      {...buttonProps}
      {...other}
    >
      {children}

      {enableTouchRipple ? 
        <TouchRipple
          {...TouchRippleProps}
          center={centerRipple}
          ref={rippleRef}
        /> :
        null}
    </ComponentProp>
  );
});
