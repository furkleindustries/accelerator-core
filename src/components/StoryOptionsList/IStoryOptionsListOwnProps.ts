import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  IClickable,
} from '../../interfaces/IClickable';
import {
  IOpenable,
} from '../../interfaces/IOpenable';
import {
  IStoryOptionComponentOwnProps,
} from '../../storyOptions/IStoryOptionComponentOwnProps';
import {
  ReactElement,
} from 'react';

export interface IStoryOptionsListOwnProps extends IClassNameable, IClickable, IOpenable {
  /**
   * Allow both <StoryOption /> and <StoryOptionList /> children.
   * An OptionList inside an OptionList becomes a nested menu.
   */
  readonly children: ReadonlyArray<
    ReactElement<IStoryOptionComponentOwnProps | IStoryOptionsListOwnProps>
  >;

  /* Only necessary if the list is being used as a submenu. */
  readonly optionPropName?: string | null;
}
