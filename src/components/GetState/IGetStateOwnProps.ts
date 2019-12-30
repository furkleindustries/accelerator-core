import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  ReactNode,
} from 'react';

export interface IGetStateOwnProps {
  readonly children: (
    currentState: IStoryStateFrame,
    utilities: {
      setStoryState: (updatedStoryState: IStoryStateFrame) => void;
    },
  ) => ReactNode;
}
