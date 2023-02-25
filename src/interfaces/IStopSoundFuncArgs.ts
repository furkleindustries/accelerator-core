import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import type {
  ISound,
} from 'sound-manager';
import {
  ISoundManagerSoundStateUpdateAction,
} from '../actions/ISoundManagerSoundStateUpdateAction';
import type {
  Dispatch,
} from 'redux';

export interface IStopSoundFuncArgs {
  readonly config: IAcceleratorConfigNormalized;
  readonly debug: boolean;
  readonly dispatch: Dispatch<ISoundManagerSoundStateUpdateAction>;
  readonly groupName: string;
  readonly sound: ISound;
  readonly soundName: string;
}
