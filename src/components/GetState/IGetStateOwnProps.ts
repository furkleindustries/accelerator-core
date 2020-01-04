import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  ISetStoryStateAware,
} from '../../interfaces/ISetStoryStateAware';
import {
  ReactNode,
} from 'react';

export interface IGetStateOwnProps {
  readonly children: (
    currentState: IStoryStateFrame,
    utilities: ISetStoryStateAware,
  ) => ReactNode;
}
