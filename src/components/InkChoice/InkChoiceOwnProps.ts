import {
  IButtonOwnProps,
} from '../Button/IButtonOwnProps';

export interface InkChoiceOwnProps extends IButtonOwnProps {
  readonly disabled: boolean;
  readonly selected: boolean;
  readonly isFadingOut?: boolean;
  readonly maxRotationAngle?: number;
  readonly maxSwipeRight?: number;
}
