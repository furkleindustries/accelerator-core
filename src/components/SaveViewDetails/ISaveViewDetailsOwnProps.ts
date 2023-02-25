import {
  INoChildren,
} from '../../interfaces/INoChildren';
import {
  IStorySerializationPointer,
} from '../../state/IStorySerializationPointer';

export interface ISaveViewDetailsOwnProps {
  readonly children?: INoChildren;
  readonly entry: IStorySerializationPointer;
  readonly storyStatePropNamesToShow?: string[]; 
}
