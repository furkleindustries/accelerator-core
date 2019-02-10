import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  Tag,
} from '../../tags/Tag';

export interface IRestartButtonStateProps {
  readonly passageName: string;
  readonly storyState: IStoryStateFrame;
  readonly lastLinkTags: Tag[];
}
