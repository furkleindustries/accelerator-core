import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';

export interface IGetStateDispatchProps {
  readonly setStoryState: (
    lastPassageName: string,
    updatedStoryState: Partial<IStoryStateFrame>,
  ) => void;
}
