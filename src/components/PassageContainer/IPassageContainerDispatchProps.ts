import {
  IStoryRequiresFullRerenderAction,
} from '../../actions/IStoryRequiresFullRerenderAction';

export interface IPassageContainerDispatchProps {
  resetStoryRequiresFullRerender(): IStoryRequiresFullRerenderAction;
}
