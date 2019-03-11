import {
  IBreadcrumbTrailAware,
} from '../../interfaces/IBreadcrumbTrailAware';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  IStoryOptionComponentOwnProps,
} from '../../storyOptions/IStoryOptionComponentOwnProps';
import {
  ITitleable,
} from '../../interfaces/ITitleable';
import {
  IVisibilityTreeAware,
} from '../BreadcrumbTrail/IVisibilityTreeAware';
import {
  ReactElement,
} from 'react';

export interface IStoryOptionsListOwnProps
  extends
    IBreadcrumbTrailAware,
    IClassNameable,
    ITitleable,
    IVisibilityTreeAware
{
  /**
   * Allow both <StoryOption /> and <StoryOptionList /> children.
   * An OptionList inside an OptionList becomes a nested menu.
   */
  readonly children: ReadonlyArray<
    ReactElement<IStoryOptionComponentOwnProps | IStoryOptionsListOwnProps>
  >;

  readonly root?: boolean;
}
