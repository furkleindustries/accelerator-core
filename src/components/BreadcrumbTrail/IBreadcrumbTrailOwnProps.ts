import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  INamed,
} from '../../interfaces/INamed';
import {
  INoChildren,
} from '../../interfaces/INoChildren';
import {
  IOpenable,
} from '../../interfaces/IOpenable';
import {
  IStoryOption,
} from '../../storyOptions/IStoryOption';
import {
  IStoryOptionsListOwnProps,
} from '../StoryOptionsList/IStoryOptionsListOwnProps';
import type {
  ComponentType,
} from 'react';

export interface IBreadcrumbTrailOwnProps extends
  IClassNameable,
  IOpenable,
  Partial<INamed>
{
  readonly ListComponent: ComponentType<IStoryOptionsListOwnProps>;
  readonly options: readonly IStoryOption[];
  readonly children?: INoChildren;
  readonly title?: string;
}
