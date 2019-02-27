import {
  IContext,
} from '../../IContext';
import {
  IPassageProps,
} from '../IPassageProps';
import {
  IState,
} from '../../state/IState';
import {
  ReactElement,
} from 'react';

export interface IPassageRenderer {
  (
    state: IState,
    context: IContext,
  ): ReactElement<IPassageProps>;
}
