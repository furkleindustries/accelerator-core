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
  IManager,
} from 'sound-manager';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
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
  readonly lastLinkTags: ReadonlyArray<Tag>;
  readonly passageObject: IPassage;
  readonly soundManager: IManager;
  readonly storyState: IStoryStateFrame;
  bookmark(): void;
  navigateTo(passageName: string, tags?: ReadonlyArray<Tag>): void;
  restart(): void;
  rewind(filter?: HistoryFilter): void;
  setStoryState(updatedStoryState: Partial<IStoryStateFrame>): void;
}
