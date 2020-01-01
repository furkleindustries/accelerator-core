import {
  HistoryFilter,
} from '../../reducers/IHistoryFilter';
import {
  IAcceleratorConfigNormalized,
} from '../../configuration/IAcceleratorConfigNormalized';
import {
  ILastLinkTagsAware,
} from '../../interfaces/ILastLinkTagsAware';
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
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContentContainerOwnProps extends ILastLinkTagsAware {
  readonly config: IAcceleratorConfigNormalized;
  readonly passageObject: IPassage;
  readonly soundManager: IManager;
  readonly storyState: IStoryStateFrame;
  readonly bookmark: () => void;
  readonly navigateTo: (
    passageName: string,
    tags?: MaybeReadonlyArray<Tag>,
  ) => void;

  readonly restart: () => void;
  readonly rewind: (filter?: HistoryFilter) => void;
  readonly setStoryState: (updatedStateProps: Partial<IStateFrame>) => void;
}
