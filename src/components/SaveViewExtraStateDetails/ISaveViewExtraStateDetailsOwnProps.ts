import {
  IAcceleratorLoggersConfiguration,
} from '../../configuration/IAcceleratorLoggersConfiguration';
import {
  IStorySerializationPointer,
} from '../../state/IStorySerializationPointer';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';

export interface ISaveViewExtraStateDetailsOwnProps {
  readonly className?: string;
  readonly entry: IStorySerializationPointer;
  readonly loggers: IAcceleratorLoggersConfiguration;
  readonly storyState: IStoryStateFrame;
  readonly storyStatePropNamesToShow: string[];
}
