import {
  ActionTypes,
} from '../ActionTypes';
import {
  InkContainerStateFrame,
} from '../../state/InkContainerStateFrame';
import {
  InkContainersUnregistrationAction,
} from '../InkContainersUnregistrationAction';

export const createInkContainersUnregistrationAction = ({
  name,
  storyState,
}: InkContainerStateFrame): InkContainersUnregistrationAction => (
  Object.freeze({
    type: ActionTypes.InkContainersUnregistration,
    value: {
      name,
      storyState,
    },
  })
);
