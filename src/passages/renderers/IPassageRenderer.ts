import {
  IAcceleratorConfigNormalized,
} from '../../configuration/IAcceleratorConfigNormalized';
import {
  IContext,
} from '../../context/IContext';
import {
  IPassageProps,
} from '../IPassageProps';
import {
  IState,
} from '../../state/IState';
import {
  Omit,
} from '../../typeAliases/Omit';
import {
  ReactElement,
} from 'react';

export interface IPassageRenderer {
  (
    config: Omit<IAcceleratorConfigNormalized, 'renderer'>,
    context: IContext,
    state: IState,
  ): ReactElement<IPassageProps>;
}
