import {
  HistoryFilter,
} from '../../reducers/IHistoryFilter';
import {
  IAcceleratorConfigNormalized,
} from '../../configuration/IAcceleratorConfigNormalized';
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
  Omit,
} from '../../typeAliases/Omit';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContentContainerOwnProps {
  readonly config: Omit<IAcceleratorConfigNormalized, 'rendererName'>;
  readonly lastLinkTags: ReadonlyArray<Tag>;
  readonly passageObject: IPassage;
  readonly soundManager: IManager;
  readonly storyState: IStoryStateFrame;
  bookmark(): void;
  navigateTo(passageName: string, tags?: ReadonlyArray<Tag>): void;
  restart(): void;
  rewind(filter?: HistoryFilter): void;
  setStoryState(updatedStateProps: Partial<IStateFrame>): void;
}
