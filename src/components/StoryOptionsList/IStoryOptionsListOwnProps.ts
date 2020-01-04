import {
  IBreadcrumbTrailAware,
} from '../../interfaces/IBreadcrumbTrailAware';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  IOpenable,
} from '../../interfaces/IOpenable';
import {
  IStoryOptionComponentOwnProps,
} from '../../storyOptions/IStoryOptionComponentOwnProps';
import {
  ITitleable,
} from '../../interfaces/ITitleable';
import {
  OneOrMaybeReadonlyArray,
} from '../../typeAliases/OneOrMaybeReadonlyArray';
import {
  ReactElement,
} from 'react';

export interface IStoryOptionsListOwnProps
  extends
    IBreadcrumbTrailAware,
    IClassNameable,
    IOpenable,
    ITitleable
{
  /**
   * Allow both <StoryOption /> and <StoryOptionList /> children.
   * An OptionList inside an OptionList becomes a nested menu.
   */
  readonly children: OneOrMaybeReadonlyArray<ReactElement<
    IStoryOptionComponentOwnProps | IStoryOptionsListOwnProps
  >>;

  readonly root?: boolean;
}
