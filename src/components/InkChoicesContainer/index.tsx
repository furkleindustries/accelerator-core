import classNames from 'classnames';
import {
  getTagNameToComponentMap,
} from '../../functions/getTagNameToComponentMap';
import {
  InkChoicesContainerOwnProps,
} from './InkChoicesContainerOwnProps';
import {
  List,
} from '../List';
import {
  ListItem,
} from '../ListItem';
import {
  maxInkChoiceSwipeRight,
} from '../InkContainer/maxInkChoiceSwipeRight';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const InkChoicesContainer: React.FC<InkChoicesContainerOwnProps> = ({
  choiceContent,
  className,
  InkChoice = getTagNameToComponentMap().InkChoice,
  maxSwipeRight = maxInkChoiceSwipeRight,
  onChoiceClick,
  selectedDelayingChoice,
}) => {
  const choiceOutput = React.useMemo<JSX.Element[]>(
    () => (
      choiceContent.map((node, key) => {
        const isDisabled = selectedDelayingChoice >= 0;
        const isSelected = selectedDelayingChoice === key;
        const isFadingOut = isDisabled && selectedDelayingChoice !== key;
        const onClick = () => onChoiceClick(key);

        return (
          <ListItem
            className={classNames(
              builtIns['ink-choice-list-item'],
              'ink-choice-list-item',
            )}

            disabled={isDisabled}
            key={key}
          >
            <InkChoice
              disabled={isDisabled}
              isFadingOut={isFadingOut}
              onClick={onClick}
              selected={isSelected}
              maxSwipeRight={maxSwipeRight}
            >
              {node}
            </InkChoice>
          </ListItem>
        );
      })
    ),

    [
      choiceContent,
      selectedDelayingChoice,
    ],
  );

  return (
    <div
      className={classNames(
        builtIns['ink-choices-block'],
        'ink-choices-block',
      )}

      role="group"
    >
      <div
        className={classNames(
          builtIns['ink-choices-container'],
          'ink-choices-container',
          className,
        )}

        role="navigation"
        aria-roledescription="Current choices"
      >
        <List
          className={classNames(
            builtIns['ink-choice-list'],
            'ink-choice-list',
          )}

          ordered={true}
        >
          {choiceOutput}
        </List>
      </div>
    </div>
  );
};
