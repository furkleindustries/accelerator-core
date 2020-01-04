import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';

export interface ILoadingScreenOwnProps extends IClassNameable {
  readonly bodyText: string;
  readonly progressMax: number;
  readonly progressStart: number;
  readonly logoPath: string;
  readonly title: string;
  readonly descriptions?: MaybeReadonlyArray<string>;
}
