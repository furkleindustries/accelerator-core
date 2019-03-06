import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassagePluginsWrapperStateProps {
  readonly lastLinkTags: ReadonlyArray<Tag>;
  readonly passageName: string;
  readonly passageTimeCounter: number;
  readonly storyState: IStoryStateFrame;
}
