import {
  StoryOptionsList,
} from './StoryOptionsList';

export function childIsStoryOptionsList<T extends { type: typeof StoryOptionsList }>(child: any): child is T {
  return child.type === StoryOptionsList;
}
