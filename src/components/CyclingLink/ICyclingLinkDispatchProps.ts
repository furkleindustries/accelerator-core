import {
  IAction,
} from '../../actions/IAction';
import {
  IHistory,
} from '../../state/IHistory';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  Dispatch,
} from 'redux';

export interface ICyclingLinkDispatchProps {
  readonly dispatch: Dispatch<IAction>;
  setStoryState(
    updatedStateProps: Partial<IStoryStateFrame>,
    history: IHistory,
  ): void;
}
