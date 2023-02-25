import {
  ActionTypes,
} from './ActionTypes';
import {
  InkContainerStateFrame,
} from '../state/InkContainerStateFrame';

export interface InkContainersStateInitAction {
  readonly type: ActionTypes.InkContainersStateInit;
  readonly value: InkContainerStateFrame;
}