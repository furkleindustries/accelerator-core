import clsx from 'clsx';
import {
  BackdropProps,
} from '@material-ui/core/Backdrop/Backdrop';
import {
  Fade,
} from '../Fade';
import {
  Styles,
  default as withStyles,
} from '@material-ui/core/styles/withStyles';

import * as React from 'react';

export const styles: Styles<any, any> = {
  /* Styles applied to the root element. */
  root: {
    // Improve scrollable dialog support.
    zIndex: -1,
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    WebkitTapHighlightColor: 'transparent',
  },

  /* Styles applied to the root element if `invisible={true}`. */
  invisible: {
    backgroundColor: 'transparent',
  },
};

const BackdropNoStyles = React.forwardRef((
  props: BackdropProps,
  ref: React.RefObject<HTMLDivElement>,
) => {
  const {
    children,
    classes,
    className,
    invisible = false,
    open,
    transitionDuration,
    ...fadeProps
  } = props;

  return (
    <Fade
      {...fadeProps}

      in={open}
      timeout={transitionDuration}
    >
      <div
        data-mui-test="Backdrop"
        className={clsx(
          classes!.root,
          { [classes!.invisible!]: invisible },
          className,
        )}

        role="presentation"
        aria-hidden="true"
        ref={ref}
      >
        {children}
      </div>
    </Fade>
  );
});

export const Backdrop = withStyles(
  styles,
  { name: 'MuiBackdrop' },
)(BackdropNoStyles);
