import {
  ButtonBase,
} from '../ButtonBase';
import classNames from 'classnames';
import {
  IButtonOwnProps,
} from './IButtonOwnProps';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const Button: React.FC<IButtonOwnProps> = React.memo(React.forwardRef((props, ref) => {
  const {
    children,
    className,
    color,
    disabled,
    disableFocusRipple,
    disableRipple,
    disableTouchRipple,
    focusVisibleClassName,
    ...otherProps
  } = props;

  const cancelRightClick = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    ev.preventDefault();
    return false;
  };

  return (
    <ButtonBase
      {...otherProps}

      className={classNames(
        builtIns['button'],
        'button',
        className,
        { disabled },
      )}

      focusRipple={!disableFocusRipple}
      focusVisibleClassName={classNames(
        'focusVisible',
        focusVisibleClassName,
      )}

      ref={ref as any}
      onContextMenu={cancelRightClick}
    >
      <span
        className={classNames('label')}
        role="group"
      >
        {children}
      </span>
    </ButtonBase>
  );
}));

Button.displayName = 'Button';
