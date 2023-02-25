import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  InkChoiceOwnProps,
} from '../InkChoice/InkChoiceOwnProps';
import type {
  ComponentType,
  ReactNode,
} from 'react';

export interface InkChoicesContainerOwnProps extends IClassNameable {
  readonly choiceContent: readonly ReactNode[];
  readonly disabled?: boolean;
  readonly InkChoice?: ComponentType<InkChoiceOwnProps>;
  readonly maxSwipeRight?: number;
  readonly onChoiceClick: (index: number) => void;
  readonly selectedDelayingChoice: number;
}
