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
  readonly children?: ReactNodeWithoutNullOrUndefined;
  readonly parseProps: ParseReactElementsAndTextProps;

  readonly onClick: (
    index: number,
    e: Event,
    resolve: () => void,
    reject: (err: Error) => void,
  ) => void;

  readonly story: StoryWithDoneEvent;
  readonly className?: string;
}
