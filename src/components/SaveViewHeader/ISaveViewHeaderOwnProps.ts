import {
  INoChildren,
} from '../../interfaces/INoChildren';
import {
  IStorySerializationPointer,
} from '../../state/IStorySerializationPointer';

export interface ISaveViewHeaderOwnProps {
  readonly children?: INoChildren;
  readonly entry: IStorySerializationPointer;
}
