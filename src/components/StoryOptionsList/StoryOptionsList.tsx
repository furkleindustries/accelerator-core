import {
  IStoryOptionsListOwnProps,
} from './IStoryOptionsListOwnProps';

import * as React from 'react';

/**
 * Allow both <StoryOption /> and <StoryOptionList /> children.
 * A StoryOptionList inside a StoryOptionList becomes a nested menu.
 */
export const StoryOptionsList: React.FunctionComponent<IStoryOptionsListOwnProps> = ({
  children,
}) => (
  <ul className="storyOptionsList">
    {children.map((child) => (
      <li className="storyOptionListItem">{child}</li>
    ))}
  </ul>
);
