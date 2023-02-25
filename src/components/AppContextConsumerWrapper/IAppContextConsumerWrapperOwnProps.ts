import {
  IContext,
} from '../../context/IContext';

export interface IAppContextConsumerWrapperOwnProps {
  readonly children: (context: IContext) => any;
}
