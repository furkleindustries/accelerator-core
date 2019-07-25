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
  readonly bookmark: () => void;
  readonly navigateTo: (passageName: string, linkTags?: Tag[] | ReadonlyArray<Tag>) => void;
  readonly restart: () => void;
  readonly rewind: (filter?: HistoryFilter) => void;
  readonly setStoryState: (
    updatedStoryState: Partial<IStoryStateFrame>,
  ) => void;
}
