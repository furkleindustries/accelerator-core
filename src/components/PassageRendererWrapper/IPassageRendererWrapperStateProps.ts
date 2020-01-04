import {
  IHistory,
} from '../../state/IHistory';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageRendererWrapperStateProps {
  readonly history: IHistory;
  readonly lastLinkTags: MaybeReadonlyArray<Tag>;
  readonly passageObject: IPassage;
  readonly storyState: IStoryStateFrame;
}
