import {
  IButtonProps,
} from '../Button/IButtonProps';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface ICyclerOwnProps extends IButtonProps {
  readonly children: MaybeReadonlyArray<ReactNodeWithoutNullOrUndefined>;
  readonly callback?: (
    current: ReactNodeWithoutNullOrUndefined,
    index?: number,
  ) => void;

  readonly startIndex?: number;
}
