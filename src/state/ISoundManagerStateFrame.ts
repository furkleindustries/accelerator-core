import {
  ISoundManagerGroupStateFrame,
} from './ISoundManagerGroupStateFrame';
import {
  ISoundManagerSoundStateFrame,
} from './ISoundManagerSoundStateFrame';

export interface ISoundManagerStateFrame {
  readonly groups: Record<string, ISoundManagerGroupStateFrame>;
  readonly sounds: Record<string, ISoundManagerSoundStateFrame>;
  readonly managerVolume: number;
}
