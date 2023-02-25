import classNames from 'classnames';
import {
  Button,
} from '../Button';
import {
  IStoryOptionsListOwnProps,
} from './IStoryOptionsListOwnProps';
import {
  IStoryOptionsListState,
} from './IStoryOptionsListState';
import {
  List,
} from '../List';
import {
  ListItem,
} from '../ListItem';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

import styles from '../../../plugins/menu/index.less';

/**
 * Allow both <StoryOption /> and <StoryOptionsList /> children.
 * A StoryOptionsList inside a StoryOptionsList becomes a nested breadcrumb
 * branch.
 */
export class StoryOptionsList extends React.PureComponent<
  IStoryOptionsListOwnProps,
  IStoryOptionsListState
> {
  public readonly state: IStoryOptionsListState = { open: false };

  public readonly render = () => {
    const {
      childOptions,
      children,
      clickOption,
      className,
      crumb,
      root,
      title,
    } = this.props;

    const { open: listOpen } = this.state;

    const optionsOutput = [ ...(childOptions || []) ].map((
      {
        content: OptionComponent,
        name: optionName,
      },

      key,
    ) => (
      <OptionComponent
        clickOption={clickOption}
        crumb={{
          name: optionName,
          path: `${crumb.path}.${key}`,
        }}

        key={optionName}
        role="treeitem"
      />
    ));

    return (
      <List
        className={classNames(
          styles['story-options-list'],
          'story-options-list',
          { [styles['root']]: root },
          { root },
        )}

        role={root ? 'tree' : 'treeitem'}
      >
        {root || listOpen ?
          <>
            <ListItem
              className={classNames(
                styles['story-options-list-item'],
                'story-options-list-item',
                className,
              )}

              role="treeitem"
            >
              {root ?
                null :
                <Typography
                  className={classNames(
                    styles['story-options-list-title'],
                    'story-options-list-title',
                  )}

                  variant="h3"
                >
                  {title || 'Untitled option'}
                </Typography>}

              {children}

              <List
                className={classNames(
                  styles['story-options-list'],
                  'story-options-list',
                )}

                role="treeitem"
              >
                {optionsOutput}
              </List>
            </ListItem>
          </> :
          <ListItem
            className={classNames(
              styles['story-options-list-item'],
              'story-options-list-item',
            )}

            role="treeitem"
          >
            <Button
              className={classNames(
                styles['story-options-list-open-button'],
                'story-options-list-open-button',
              )}

              onClick={this.openList}
              role="toggle"
              aria-pressed={listOpen}
            >
              {title || 'Untitled option'}
            </Button>
          </ListItem>}
      </List>
    );
  };

  public readonly openList = () => {
    this.props.clickOption(this.props.crumb);
    this.setState({ open: true });
  };

  public readonly closeList = () => {
    this.setState({ open: false });
  };
}
