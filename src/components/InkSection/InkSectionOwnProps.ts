import {
  ParseReactElementsAndTextProps,
} from '../../typeAliases/ParseReactElementsAndTextProps';
import {
  Story,
} from 'inkjs/engine/Story';

export interface InkSectionOwnProps {
  readonly parseProps: ParseReactElementsAndTextProps;

  readonly onClick: (
    index: number,
    e: Event,
    resolve: () => void,
    reject: (err: Error) => void,
  ) => void;

  readonly story: Story;
  readonly className?: string;
}
