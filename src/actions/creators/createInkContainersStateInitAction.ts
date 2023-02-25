import {
  ActionTypes,
} from '../ActionTypes';
import {
  InkContainersStateInitAction,
} from '../InkContainersStateInitAction';
import {
  InkContainerStateFrame,
} from '../../state/InkContainerStateFrame';

export const createInkContainersStateInitAction = ({
  name,
  storyState,
}: InkContainerStateFrame): InkContainersStateInitAction => (
  Object.freeze({
    type: ActionTypes.InkContainersStateInit,
    value: {
      name,
      storyState,
    },
  })
);
