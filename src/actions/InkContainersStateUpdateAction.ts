import {
  ActionTypes,
} from './ActionTypes';
import {
  InkContainerStateFrame,
} from '../state/InkContainerStateFrame';

export interface InkContainersStateUpdateAction {
  readonly type: ActionTypes.InkContainersStateUpdate;
  readonly value: InkContainerStateFrame;
}
