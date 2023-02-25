import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import type {
  IFade,
} from 'sound-manager';
import {
  ISoundManagerAware,
} from './ISoundManagerAware';
import {
  ISoundManagerSoundStateUpdateAction,
} from '../actions/ISoundManagerSoundStateUpdateAction';
import type {
  Dispatch,
} from 'redux';

export interface IPlaySoundFuncArgs extends ISoundManagerAware {
  readonly config: IAcceleratorConfigNormalized;
  readonly debug: boolean;
  readonly dispatch: Dispatch<ISoundManagerSoundStateUpdateAction>;
  readonly soundName: string;
  readonly fade?: string | Partial<IFade> | null;
  readonly fadeOnLoops?: string | boolean;
  readonly groupName?: string;
  readonly loop?: string | boolean | null;
  readonly volume?: number | string | null;
}
