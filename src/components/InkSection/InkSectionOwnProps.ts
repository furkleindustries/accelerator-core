import {
  ParseReactElementsAndTextProps,
} from '../../typeAliases/ParseReactElementsAndTextProps';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';
import {
  StoryWithDoneEvent,
} from '../../../lib/ink/StoryWithDoneEvent';

export interface InkSectionOwnProps {
  readonly onClick: (
    index: number,
    e: Event,
    resolve: () => void,
    reject: (err: Error) => void,
  ) => void;

  readonly story: StoryWithDoneEvent;
  readonly children?: ReactNodeWithoutNullOrUndefined;
  readonly className?: string;
}
