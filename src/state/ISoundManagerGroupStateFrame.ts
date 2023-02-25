import type {
  ISoundLabel,
} from 'sound-manager';

export interface ISoundManagerGroupStateFrame {
  readonly groupName: string;
  readonly label: ISoundLabel;
  readonly volume: number;
}