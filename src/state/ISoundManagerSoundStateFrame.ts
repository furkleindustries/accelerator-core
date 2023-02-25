import type {
  IFade,
  ISoundLabel,
} from 'sound-manager';

export interface ISoundManagerSoundStateFrame {
  readonly fade: IFade | null;
  readonly groupName: string;
  readonly label: ISoundLabel;
  readonly loop: boolean;
  readonly playing: boolean;
  readonly soundName: string;
  readonly startedTime: number;
  readonly volume: number;
}
