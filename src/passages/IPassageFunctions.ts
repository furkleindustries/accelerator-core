import {
  HistoryFilter,
} from '../reducers/IHistoryFilter';
import {
  IStateFrame,
} from '../state/IStateFrame';
import {
  Tag,
} from '../tags/Tag';

export interface IPassageFunctions {
  bookmark(): void,
  navigateTo(passageName: string, linkTags?: ReadonlyArray<Tag>): void,
  restart(): void,
  rewind(filter?: HistoryFilter): void,
  setStoryState(updatedStoryState: Partial<IStateFrame>): void,
}
