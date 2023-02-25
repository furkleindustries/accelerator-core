import {
  IStoryEndAction,
} from '../../actions/IStoryEndAction';
import type {
  Dispatch,
} from 'redux';

export interface IEndDispatchProps {
  readonly dispatch: Dispatch<IStoryEndAction>;
}
