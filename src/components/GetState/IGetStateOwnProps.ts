import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  ISetStoryStateAware,
} from '../../interfaces/ISetStoryStateAware';
import type {
  ReactNode,
} from 'react';

export interface IGetStateOwnProps {
  readonly children: (
    currentState: IStoryStateFrame,
    utilities: ISetStoryStateAware,
  ) => ReactNode;
}
