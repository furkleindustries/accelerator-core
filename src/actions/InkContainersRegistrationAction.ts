import {
  ActionTypes,
} from './ActionTypes';
import {
  InkContainerStateFrame,
} from '../state/InkContainerStateFrame';

export interface InkContainersRegistrationAction {
  readonly type: ActionTypes.InkContainersRegistration;
  readonly value: InkContainerStateFrame;
}