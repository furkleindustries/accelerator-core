import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
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
export interface IStoryOptionsListOwnProps extends IClassNameable {
  readonly children: ReadonlyArray<
    ReactElement<IStoryOptionComponentOwnProps | IStoryOptionsListOwnProps>
  >;

  /* Only necessary if the list is being used as a submenu. */
  readonly optionPropName?: string | null;
}
