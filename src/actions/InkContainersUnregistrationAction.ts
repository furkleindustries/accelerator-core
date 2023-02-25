import {
  ActionTypes,
} from './ActionTypes';
import {
  InkContainerStateFrame,
} from '../state/InkContainerStateFrame';

export interface InkContainersUnregistrationAction {
  readonly type: ActionTypes.InkContainersUnregistration;
  readonly value: InkContainerStateFrame;
}
