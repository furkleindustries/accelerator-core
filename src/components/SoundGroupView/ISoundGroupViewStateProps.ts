import {
  ISoundManagerSoundStateFrame,
} from '../../state/ISoundManagerSoundStateFrame';

export interface ISoundGroupViewStateProps {
  readonly soundsState: Record<string, ISoundManagerSoundStateFrame>;
}
