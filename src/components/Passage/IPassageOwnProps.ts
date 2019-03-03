import {
  HistoryFilter,
} from '../../reducers/IHistoryFilter';
import {
  IAction,
} from '../../actions/IAction';
import {
  IFooter,
} from '../../passages/IFooter';
import {
  IHeader,
} from '../../passages/IHeader';
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
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageOwnProps {
  readonly dispatch: Dispatch<IAction>;
  readonly footers: IFooter[];
  readonly headers: IHeader[];
  readonly history: IHistory;
  readonly lastLinkTags: Tag[];
  readonly passageObject: IPassage;
  readonly passagesMap: IPassagesMap;
  readonly soundManager: IManager;
  readonly storyState: Partial<IStateFrame>;
  bookmark(): void;
  navigateTo(passageName: string, tags?: Tag[]): void;
  restart(): void;
  rewind(filter?: HistoryFilter): void;
  setStoryState(updatedStoryState: Partial<IStateFrame>): void;
}
