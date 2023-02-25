import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  InkContainersRegistrationAction,
} from '../actions/InkContainersRegistrationAction';
import {
  InkContainerStateFrame,
} from '../state/InkContainerStateFrame';
import {
  InkContainersStateInitAction,
} from '../actions/InkContainersStateInitAction';
import {
  InkContainersStateUpdateAction,
} from '../actions/InkContainersStateUpdateAction';
import {
  InkContainersUnregistrationAction,
} from '../actions/InkContainersUnregistrationAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';

export const inkContainersReducer = (
  previousState: Record<string, InkContainerStateFrame> = {},

  action: InkContainersRegistrationAction |
    InkContainersUnregistrationAction |
    InkContainersStateUpdateAction |
    InkContainersStateInitAction |
    IStoryResetAction,
) => {
  if (action.type === ActionTypes.StoryReset) {
    return {};
  } else if (action.type === ActionTypes.InkContainersRegistration) {
    previousState[action.value.name] = { ...action.value };
  } else if (action.type === ActionTypes.InkContainersStateInit ||
    action.type === ActionTypes.InkContainersStateUpdate)
  {
    previousState[action.value.name] = { ...action.value };
  } else if (action.type === ActionTypes.InkContainersUnregistration) {
    delete previousState[action.value.name];
  }

  return previousState;
};
