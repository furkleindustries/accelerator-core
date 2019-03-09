import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  RefObject,
} from 'react';

export interface ISoundManagerAudioPanelOwnProps extends IClassNameable {
  readonly ref?: RefObject<HTMLDivElement>;
}
