import type {
  IFade,
} from 'sound-manager';

export interface IPlaySoundOwnProps {
  readonly name: string;
  // Defaults to 'default'.
  readonly group?: string;
  readonly fadeOverride?: string | Partial<IFade> | null;
  readonly loopOverride?: string | boolean | null;
  readonly volumeOverride?: string | number | null;
}
