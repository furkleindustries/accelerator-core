import {
  IHistory,
} from '../../state/IHistory';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  IStateFrame,
} from '../../state/IStateFrame';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageRendererWrapperStateProps {
  readonly history: IHistory;
  readonly lastLinkTags: ReadonlyArray<Tag>;
  readonly passageObject: IPassage;
  readonly storyState: IStateFrame;
}
