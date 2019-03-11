import {
  IStoryOptionComponentOwnProps,
} from '../../storyOptions/IStoryOptionComponentOwnProps';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ComponentType,
  ReactElement,
} from 'react';

export interface IBreadcrumbTrailOwnProps<T extends any = any> extends IClassNameable {
  readonly children: ReadonlyArray<ReactElement<T>>;
  readonly listComponent: ComponentType<IStoryOptionComponentOwnProps>;
  readonly name?: string;
}
