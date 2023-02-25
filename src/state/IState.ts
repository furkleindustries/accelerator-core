import {
  IAcceleratorAutoplayerConfigurationNormalized,
} from '../configuration/IAcceleratorAutoplayerConfigurationNormalized';
import {
  IHistory,
} from './IHistory';
import {
  ISoundManagerStateFrame,
} from '../state/ISoundManagerStateFrame';
import {
  IStoryStateSavePointerMap,
} from './IStoryStateSavePointerMap';

export interface IState {
  readonly autoplayerState: IAcceleratorAutoplayerConfigurationNormalized;
  readonly debug: boolean;
  readonly currentSaveUuid: string;
  readonly history: IHistory;
  readonly passageReady: boolean;
  readonly soundManagerState: ISoundManagerStateFrame;
  readonly soundsLoaded: boolean;
  readonly storyLoaded: boolean;
  readonly storyOptionsDialogVisible: boolean;
  readonly storyRequiresFullRerender: boolean;
  readonly storyStateSavePointers: IStoryStateSavePointerMap;
}
