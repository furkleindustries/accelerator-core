import {
  IButtonProps,
} from '../Button/IButtonProps';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface ICyclerOwnProps extends IButtonProps {
  children: ReactNodeWithoutNullOrUndefined[];
  callback?(current: ReactNodeWithoutNullOrUndefined, index?: number): void;
}
