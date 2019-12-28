import {
  IButtonProps,
} from '../Button/IButtonProps';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface ICyclerOwnProps extends IButtonProps {
  readonly children: ReadonlyArray<ReactNodeWithoutNullOrUndefined>;
  callback?(current: ReactNodeWithoutNullOrUndefined, index?: number): void;
  startIndex?: number;
}
