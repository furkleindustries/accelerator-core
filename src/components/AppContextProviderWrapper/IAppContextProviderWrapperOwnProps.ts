import {
  IContext,
} from '../../context/IContext';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IAppContextProviderWrapperOwnProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly initialContext: IContext;
}
