import {
  IStoryStateUpdateAction,
} from '../../actions/IStoryStateUpdateAction';

export interface ICyclingLinkDispatchProps {
  setStoryState(newState: { [key: string]: any }): IStoryStateUpdateAction;
}

export default ICyclingLinkDispatchProps;
