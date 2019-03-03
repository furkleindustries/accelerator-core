import {
  HistoryFilter,
} from '../../reducers/IHistoryFilter';
import {
  IHistory,
} from '../../state/IHistory';
import {
  IManager,
} from 'sound-manager';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
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
  readonly history: IHistory;
  readonly lastLinkTags: Tag[];
  readonly passageObject: IPassage;
  readonly passagesMap: IPassagesMap;
  readonly soundManager: IManager;
  readonly storyState: IStoryStateFrame;
  bookmark(): void;
  navigateTo(passageName: string, tags?: Tag[]): void;
  restart(): void;
  rewind(filter?: HistoryFilter): void;
  setStoryState(updatedStateProps: Partial<IStateFrame>): void;
}
