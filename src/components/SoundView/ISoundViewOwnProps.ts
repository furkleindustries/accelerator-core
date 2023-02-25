import {
  IClassNameable,
} from '../../interfaces/IClassNameable';

export interface ISoundViewOwnProps extends IClassNameable {
  readonly groupName: string;
  readonly soundName: string;
}
