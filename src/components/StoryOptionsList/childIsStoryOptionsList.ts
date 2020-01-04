import {
  StoryOptionsList,
} from '.';

export const childIsStoryOptionsList = <
  T extends { type: typeof StoryOptionsList }
>(child: any): child is T => child.type === StoryOptionsList;
