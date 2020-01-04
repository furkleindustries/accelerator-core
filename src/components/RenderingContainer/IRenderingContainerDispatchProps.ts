import {
  IStoryRequiresFullRerenderAction,
} from '../../actions/IStoryRequiresFullRerenderAction';

export interface IRenderingContainerDispatchProps {
  readonly resetStoryRequiresFullRerender: () => IStoryRequiresFullRerenderAction;
}
