import {
  INoChildren,
} from '../../interfaces/INoChildren';
import {
  IStorySerializationPointer,
} from '../../state/IStorySerializationPointer';

export interface ISaveViewNewGamePlusDetailsOwnProps {
  readonly children?: INoChildren;
  readonly entry: IStorySerializationPointer;
}
