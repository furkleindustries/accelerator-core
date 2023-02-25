import {
  ActionTypes,
} from '../ActionTypes';
import {
  InkContainersRegistrationAction,
} from '../InkContainersRegistrationAction';
import {
  InkContainerStateFrame,
} from '../../state/InkContainerStateFrame';

export const createInkContainersRegistrationAction = ({
  name,
  storyState,
}: InkContainerStateFrame): InkContainersRegistrationAction => (
  Object.freeze({
    type: ActionTypes.InkContainersRegistration,
    value: {
      name,
      storyState,
    },
  })
);
