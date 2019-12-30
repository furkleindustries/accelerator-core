import {
  ReactNode,
} from 'react';
import {
  IManager,
  ISound,
} from 'sound-manager';

export interface IGetSoundOwnProps {
  readonly children: (
    sound: ISound,
    utilities: {
      soundManager: IManager;
      getGroup: IManager['collection']['getGroup'];
      getSound: IManager['collection']['getSound'];
    },
  ) => ReactNode;

  readonly name: string;
  readonly placeholder?: ReactNode;
}
