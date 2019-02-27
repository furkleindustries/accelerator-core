import {
  IManager,
} from 'sound-manager';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IAppContextProviderWrapperOwnProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly soundManager: IManager;
}
