import { IStoryOptionComponentOwnProps } from '../../storyOptions/IStoryOptionComponentOwnProps';
import { IStoryOptionsListOwnProps } from './IStoryOptionsListOwnProps';
import {
  cloneElement,
  ReactElement,
} from 'react';
import {
  StoryOptionsList,
} from './StoryOptionsList';
import { IBreadcrumbItem } from '../Breadcrumb/IBreadcrumbItem';

export function addNeededPropsToStoryOptionsListChild<T extends { children: ReactElement }>(args: {
  readonly addBreadcrumb: (crumb: IBreadcrumbItem) => void;
  readonly breadcrumbTrail: IBreadcrumbItem[];
  readonly child: ReactElement<T>;
  readonly removeBreadcrumb: () => void;
}): ReactElement<T> {
  const {
    child,
    ...props
  } = args;

  const {
    props: { children },
    type,
  } = child;

  if (type === StoryOptionsList) {
    return cloneElement<T>(child, {
      ...props,
      children,
    });
  }

  return child;
}