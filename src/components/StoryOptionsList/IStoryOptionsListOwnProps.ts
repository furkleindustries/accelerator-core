import {
  IStoryOptionComponentOwnProps,
} from '../../storyOptions/IStoryOptionComponentOwnProps';
import {
  ReactElement,
} from 'react';

/**
 * Allow both <StoryOption /> and <StoryOptionList /> children.
 * An OptionList inside an OptionList becomes a nested menu.
 */
export interface IStoryOptionsListOwnProps {
  readonly children: ReadonlyArray<
    ReactElement<IStoryOptionComponentOwnProps | IStoryOptionsListOwnProps>
  >;
}
