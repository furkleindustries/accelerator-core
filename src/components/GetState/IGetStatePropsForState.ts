import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';

export interface IGetStatePropsForState {
  readonly lastPassageName: string;
  readonly storyState: IStoryStateFrame;
}
