import {
  IHistory,
} from './IHistory';

export type OmittedStateTypes =
  'autoplayerState' |
    'currentSaveUuid' |
    'passageReady' |
    'soundManagerState' |
    'soundsLoaded' |
    'storyLoaded' |
    'storyRequiresFullRerender';

export interface IStorySerialization {
  readonly engineHistory: IHistory;
  readonly saveName: string;
  readonly uuid: string;
}
