import {
  IContext,
} from '../../context/IContext';
import {
  FunctionComponent,
} from 'react';

export interface IAppContextConsumerWrapperOwnProps {
  readonly children: FunctionComponent<IContext>;
}
