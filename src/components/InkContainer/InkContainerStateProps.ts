import {
  IAcceleratorAutoplayerConfigurationNormalized,
} from '../../configuration/IAcceleratorAutoplayerConfigurationNormalized';
import {
  IHistory,
} from '../../state/IHistory';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  InkContainerStateFrame,
} from '../../state/InkContainerStateFrame';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  ITag,
} from '../../tags/ITag';
import {
  PassageNames,
} from '../../passages/IPassagesMap';

export interface InkContainerStateProps {
  readonly autoplayerState: IAcceleratorAutoplayerConfigurationNormalized;
  readonly history: IHistory;
  readonly inkContainerStateFrame: InkContainerStateFrame | null;
  readonly lastLinkTags: readonly ITag[];
  readonly lastPassageName: PassageNames;
  readonly passageObject: IPassage;
  readonly passageTimeCounter: number;
  readonly storyState: IStoryStateFrame;
}
