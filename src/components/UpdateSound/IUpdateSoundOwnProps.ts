import type {
  IFade,
} from 'sound-manager';

export interface IUpdateSoundOwnProps {
  readonly name: string;
  readonly fade?: IFade;
  readonly group?: string;
  readonly loop?: boolean;
  readonly trackPosition?: number;
  readonly volume?: number;
}
