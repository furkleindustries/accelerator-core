import classnames from 'classnames';
import {
  IStoryOptionsListOwnProps,
} from './IStoryOptionsListOwnProps';

import * as React from 'react';

import styles from './StoryOptionsList.scss';

/**
 * Allow both <StoryOption /> and <StoryOptionList /> children.
 * A StoryOptionList inside a StoryOptionList becomes a nested menu.
 */
export const StoryOptionsList: React.FunctionComponent<
  IStoryOptionsListOwnProps
> = ({
  children,
  className,
  optionPropName,
}) => (
  <div className={classnames('storyOptionsListContainer')}>
    <ul className={classnames(
      'storyOptionsList',
      styles.storyOptionsList,
      className,
    )}>
      {optionPropName ?
        <h4 className={classnames('storyOptionsListButton')}>{
          optionPropName
        }</h4> :
        null}

      {children.map((child, key) => (
        <li
          className={classnames('storyOptionListItem')}
          key={key}
        >
          {child.props.optionPropName ?
            <h4>{child.props.optionPropName}</h4> :
            null}

          {child}
        </li>
      ))}
    </ul>
  </div>
);
