import {
  IStoryStateAction,
} from '../../actions/IStoryStateAction';

export interface ICyclingLinkDispatchProps {
  setStoryState(newState: { [key: string]: any }): IStoryStateAction;
}

export default ICyclingLinkDispatchProps;
