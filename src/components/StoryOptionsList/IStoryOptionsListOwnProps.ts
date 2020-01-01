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
  OneOrMaybeReadonlyArray,
} from '../../typeAliases/OneOrMaybeReadonlyArray';
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
  readonly children: OneOrMaybeReadonlyArray<ReactElement<
    IStoryOptionComponentOwnProps | IStoryOptionsListOwnProps
  >>;

  readonly open?: boolean;
  readonly root?: boolean;
}
