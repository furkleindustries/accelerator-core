import {
  HistoryFilter,
} from '../reducers/IHistoryFilter';
import {
  IStoryStateFrame,
} from '../state/IStoryStateFrame';
import {
  Tag,
} from '../tags/Tag';

export interface IPassageFunctions {
  bookmark(): void,
  navigateTo(passageName: string, linkTags?: ReadonlyArray<Tag>): void,
  restart(): void,
  rewind(filter?: HistoryFilter): void,
  setStoryState(updatedStoryState: Partial<IStoryStateFrame>): void,
}
