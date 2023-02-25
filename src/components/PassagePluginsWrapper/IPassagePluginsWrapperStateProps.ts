import {
  IAcceleratorAutoplayerConfigurationNormalized,
} from '../../configuration/IAcceleratorAutoplayerConfigurationNormalized';
import {
  PassageNames,
} from '../../passages/IPassagesMap';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  ITag,
} from '../../tags/ITag';

export interface IPassagePluginsWrapperStateProps {
  readonly autoplayerState: IAcceleratorAutoplayerConfigurationNormalized;
  readonly lastLinkTags: readonly ITag[];
  readonly passageName: PassageNames;
  readonly storyState: IStoryStateFrame;
}
