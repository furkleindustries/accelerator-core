import {
  ActionTypes,
} from '../ActionTypes';
import {
  InkContainerStateFrame,
} from '../../state/InkContainerStateFrame';
import {
  InkContainersStateUpdateAction,
} from '../InkContainersStateUpdateAction';

export const createInkContainersStateUpdateAction = ({
  name,
  storyState,
}: InkContainerStateFrame): InkContainersStateUpdateAction => Object.freeze({
  type: ActionTypes.InkContainersStateUpdate,
  value: {
    name,
    storyState,
  },
});
