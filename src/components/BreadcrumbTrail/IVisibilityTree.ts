import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';

export interface IVisibilityTree {
  readonly children: MaybeReadonlyArray<IVisibilityTree>;
  readonly open: boolean;
  readonly visible: boolean;
}
