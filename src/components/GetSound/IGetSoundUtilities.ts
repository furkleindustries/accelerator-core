import {
  ISoundManagerAware,
} from '../../interfaces/ISoundManagerAware';
import {
  IManager,
} from 'sound-manager';

export interface IGetSoundUtilities extends ISoundManagerAware {
  readonly getGroup: IManager['collection']['getGroup'];
  readonly getSound: IManager['collection']['getSound'];
  readonly hasGroup: IManager['collection']['hasGroup'];
  readonly hasSound: IManager['collection']['hasSound'];
}
