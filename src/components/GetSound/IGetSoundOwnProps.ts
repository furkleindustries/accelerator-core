import {
  IGetSoundUtilities,
} from './IGetSoundUtilities';
import {
  INamed,
} from '../../interfaces/INamed';
import {
  IRendersPlaceholder,
} from '../../interfaces/IRendersPlaceholder';
import {
  ReactNode,
} from 'react';
import {
  ISound,
} from 'sound-manager';

export interface IGetSoundOwnProps extends
  INamed,
  Partial<IRendersPlaceholder>
{
  readonly children: (
    sound: ISound,
    utilities: IGetSoundUtilities,
  ) => ReactNode;
}
