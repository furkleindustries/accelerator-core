import {
  IManager,
} from 'sound-manager';

export interface ISoundManagerAware {
  readonly soundManager: IManager;
}
