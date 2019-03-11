import {
  argumentsAreValid,
} from './argumentsAreValid';
import {
  Button,
} from '../Button/Button';
import {
  childIsStoryOptionsList,
} from './childIsStoryOptionsList';
import {
  childIsShownInVisibilityTree,
} from './childIsShownInVisibilityTree';
import classnames from 'classnames';
import {
  IStoryOptionsListOwnProps,
} from './IStoryOptionsListOwnProps';

import * as React from 'react';

import styles from './StoryOptionsList.scss';
import { assertValid, assert } from 'ts-assertions';
import { IVisibilityTree } from '../BreadcrumbTrail/IVisibilityTree';

/**
 * Allow both <StoryOption /> and <StoryOptionsList /> children.
 * A StoryOptionsList inside a StoryOptionsList becomes a nested breadcrumb
 * branch.
 */
export const StoryOptionsList: React.FunctionComponent<
  IStoryOptionsListOwnProps
> = ({
  addBreadcrumb,
  children,
  className,
  open,
  optionPropName,
  removeBreadcrumb,
  visibilityTree,
}) => {
  let content: React.ReactNode;
  if (open) {
    content = (
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

            {(() => {
              assert(
                argumentsAreValid({
                  addBreadcrumb,
                  removeBreadcrumb,
                  visibilityTree,
                }),
              );

              const vizTree = assertValid<IVisibilityTree>(
                visibilityTree,
              );

              if (!childIsShownInVisibilityTree(vizTree, key)) {
                return null;
              }

              if (childIsStoryOptionsList(child)) {
                return React.cloneElement(child, {
                  addBreadcrumb,
                  removeBreadcrumb,
                  visibilityTree: vizTree.children[key] || { children: [] },
                });
              }

              return child;
            })()}
          </li>
        ))}
      </ul>
    );
  } else {
    content = (
      <Button
        {...(addBreadcrumb ? {
            onClick() {
              addBreadcrumb({ name: this.title || 'Story options list' });
            },
          } :
          {})}
      >
        {optionPropName || 'Story options list'}
      </Button>
    );
  }

  return (
    <div className={classnames('storyOptionsListContainer')}>
      {content}
    </div>
  );
};
