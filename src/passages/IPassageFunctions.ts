import {
  HistoryFilter,
} from '../reducers/IHistoryFilter';
import {
  ISetStoryStateAware,
} from '../interfaces/ISetStoryStateAware';
import {
  MaybeReadonlyArray,
} from '../typeAliases/MaybeReadonlyArray';
import {
  Tag,
} from '../tags/Tag';

export interface IPassageFunctions extends ISetStoryStateAware {
  readonly bookmark: () => void;
  readonly navigateTo: (passageName: string, linkTags?: MaybeReadonlyArray<Tag>) => void;
  readonly restart: () => void;
  readonly rewind: (filter?: HistoryFilter) => void;
}
