import {
  IAction,
} from '../../actions/IAction';
import {
  IHistoryFilter,
} from '../../reducers/IHistoryFilter';
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
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContentsContainerDispatchProps {
  readonly dispatch: Dispatch<IAction>;
  bookmark(): void;
  navigateTo(passageName: string, tags?: Readonly<Tag[]>): void;
  restart(
    currentPassageObject: IPassage,
    currentStoryState: IStoryStateFrame,
    lastLinkTags: Tag[],
  ): void,

  rewind(
    present: IStateFrame,
    past: IStateFrame[],
    filter?: IHistoryFilter,
  ): void;
}
