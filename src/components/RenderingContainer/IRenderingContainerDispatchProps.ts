import {
  IStoryRequiresFullRerenderAction,
} from '../../actions/IStoryRequiresFullRerenderAction';

export interface IRenderingContainerDispatchProps {
  resetStoryRequiresFullRerender(): IStoryRequiresFullRerenderAction;
}
