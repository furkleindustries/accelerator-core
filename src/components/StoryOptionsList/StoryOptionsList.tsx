import {
  argumentsAreValid,
} from './argumentsAreValid';
import {
  Button,
} from '../Button/Button';
import {
  childIsShownInVisibilityTree,
} from './childIsShownInVisibilityTree';
import classnames from 'classnames';
import {
  IGetBreadcrumbPropsReturn,
} from '../BreadcrumbTrail/IGetBreadcrumbPropsReturn';
import {
  IStoryOptionsListOwnProps,
} from './IStoryOptionsListOwnProps';
import {
  IVisibilityTree,
} from '../BreadcrumbTrail/IVisibilityTree';
import {
  assertValid,
} from 'ts-assertions';
import {
  Typography,
} from '../Typography/Typography';

import * as React from 'react';

import styles from './StoryOptionsList.less';

/**
 * Allow both <StoryOption /> and <StoryOptionsList /> children.
 * A StoryOptionsList inside a StoryOptionsList becomes a nested breadcrumb
 * branch.
 */
export class StoryOptionsList extends React.Component<
  IStoryOptionsListOwnProps
> {
  public readonly render = () => {
    const {
      children,
      className,
      getBreadcrumbProps,
      root = false,
      title,
      treeSelector,
    } = this.props;

    let content: React.ReactNode;

    const {
      addBreadcrumb,
      breadcrumbTrail,
      removeBreadcrumb,
      visibilityTree,
    } = (typeof getBreadcrumbProps === 'function' ? getBreadcrumbProps() : {}) as IGetBreadcrumbPropsReturn;

    /* Do not show the list if the root node is visible: false.*/
    if (visibilityTree && visibilityTree.visible === false) {
      return null;
    }

    /** If it is the root list, never collapse it. */
    if (root || visibilityTree.open) {
      const areValid = argumentsAreValid({
        addBreadcrumb,
        breadcrumbTrail,
        removeBreadcrumb,
        treeSelector,
        visibilityTree,
      });

      content = (
        <ul className={classnames(
          'storyOptionsList',
          styles.storyOptionsList,
          className,
        )}>
          {title ?
            <Typography
              className={classnames('storyOptionsListButton')}
              component="h4"
            >{
              title
            }</Typography> :
            null}

          {children.map((child, key) => {
            /**
             * Do not do any visibility mutation for elements which do not pass
             * breadcrumb props.
             */
            if (!areValid) {
              return child;
            }

            const vizTree = assertValid<IVisibilityTree>(
              visibilityTree,
            );

            let childContent: React.ReactNode = child;
            if (!childIsShownInVisibilityTree(vizTree, key)) {
              childContent = null;
            } else {
              childContent = React.cloneElement(child, {
                treeSelector: treeSelector!.concat([ key ]),
                getBreadcrumbProps() {
                  return { 
                    addBreadcrumb,
                    breadcrumbTrail,
                    removeBreadcrumb,
                    visibilityTree: vizTree.children[key],
                  };
                },
              });
            }

            return (
              <li
                className={classnames('storyOptionListItem')}
                key={key}
              >{
                childContent
              }</li>
            );
          })}
        </ul>
      );
    } else {
      content = (
        <Button onClick={this.openMenu}>{
          title || 'Story options list'
        }</Button>
      );
    }

    return (
      <div className={classnames('storyOptionsListContainer')}>
        {content}
      </div>
    );
  };

  private readonly openMenu = () => {
    const {
      getBreadcrumbProps,
      title,
    } = this.props;

    if (typeof getBreadcrumbProps === 'function') {
      getBreadcrumbProps().addBreadcrumb({
        name: title || 'Story options list',
        treeSelector: this.props.treeSelector,
      });
    }
  };
};
