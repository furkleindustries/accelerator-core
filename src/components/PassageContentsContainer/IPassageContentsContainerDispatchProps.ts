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
  IStateInstance,
} from '../../state/IStateInstance';
import {
  IStoryStateInstance,
} from '../../state/IStoryStateInstance';
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
    currentStoryState: IStoryStateInstance,
    lastLinkTags: Tag[],
  ): void,

  rewind(
    present: IStateInstance,
    past: IStateInstance[],
    filter?: IHistoryFilter,
  ): void;
}
