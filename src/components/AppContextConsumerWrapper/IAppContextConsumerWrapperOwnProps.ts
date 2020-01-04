import {
  IContext,
} from '../../context/IContext';
import {
  ReactNode,
} from 'react';

export interface IAppContextConsumerWrapperOwnProps {
  readonly children: (context: IContext) => ReactNode;
}
