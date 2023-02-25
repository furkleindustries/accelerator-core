import {
  IButtonOwnProps,
} from '../Button/IButtonOwnProps';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface ICyclerOwnProps extends IButtonOwnProps {
  readonly children: MaybeReadonlyArray<ReactNodeWithoutNullOrUndefined>;
  readonly callback?: (
    current: ReactNodeWithoutNullOrUndefined,
    index?: number,
  ) => void;

  readonly startIndex?: number;
}
