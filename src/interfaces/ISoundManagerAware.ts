import type {
  IManager,
} from 'sound-manager';

export interface ISoundManagerAware {
  readonly getSoundManager: () => IManager;
}
