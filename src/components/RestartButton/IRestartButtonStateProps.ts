import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  ITag,
} from '../../tags/ITag';

export interface IRestartButtonStateProps {
  readonly passageName: string;
  readonly storyState: IStoryStateFrame;
  readonly lastLinkTags: ReadonlyArray<ITag>;
}
