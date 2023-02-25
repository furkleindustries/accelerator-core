import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  INoChildren,
} from '../../interfaces/INoChildren';

export interface IDebugControllerOwnProps extends IClassNameable, INoChildren {
  readonly id?: string;
}
