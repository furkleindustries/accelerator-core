import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  IStorySerializationPointer,
} from '../../state/IStorySerializationPointer';
import {
  PassageNames,
} from '../../passages/IPassagesMap';

export interface ISaveControllerOwnProps extends IClassNameable {
  readonly currentPassageName: PassageNames;
  readonly entry: IStorySerializationPointer;
  readonly isCurrentSaveFile: boolean;
}
