import { IRendersPlaceholder } from '../../interfaces/IRendersPlaceholder';
import {
  INamed,
} from '../../interfaces/INamed';
import {
  ReactNode,
} from 'react';
import {
  IManager,
  ISound,
} from 'sound-manager';

export interface IGetSoundOwnProps extends
  INamed,
  Partial<IRendersPlaceholder>
{
  readonly children: (
    sound: ISound,
    utilities: {
      soundManager: IManager;
      getGroup: IManager['collection']['getGroup'];
      getSound: IManager['collection']['getSound'];
      hasGroup: IManager['collection']['hasGroup'];
      hasSound: IManager['collection']['hasSound'];
    },
  ) => ReactNode;
}
