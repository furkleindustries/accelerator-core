import type {
  ButtonBaseProps,
} from '@material-ui/core';
import type {
  AriaAttributes,
  ElementType,
} from 'react';

export interface IButtonBaseOwnProps
  extends
    ButtonBaseProps,
    AriaAttributes
{
  readonly autoFocus?: boolean;
  readonly component?: ElementType;
  readonly disableFocusRipple?: boolean;
  readonly focusVisibleClassName?: string;
  readonly timeout?: number;
}
