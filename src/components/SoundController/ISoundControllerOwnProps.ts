import {
  IClassNameable,
} from '../../interfaces/IClassNameable';

export interface ISoundControllerOwnProps extends IClassNameable {
  readonly groupName: string;
  readonly soundName: string;
}
