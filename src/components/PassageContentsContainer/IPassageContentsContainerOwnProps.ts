import {
  HistoryFilter,
} from '../../reducers/IHistoryFilter';
import {
  IManager,
} from 'sound-manager';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  IStateFrame,
} from '../../state/IStateFrame';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContentsContainerOwnProps {
  readonly lastLinkTags: ReadonlyArray<Tag>;
  readonly passageObject: IPassage;
  readonly soundManager: IManager;
  readonly storyState: IStoryStateFrame;
  bookmark(): void;
  navigateTo(passageName: string, tags?: ReadonlyArray<Tag>): void;
  restart(): void;
  rewind(filter?: HistoryFilter): void;
  setStoryState(updatedStateProps: Partial<IStateFrame>): void;
}
