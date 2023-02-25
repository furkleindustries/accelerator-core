import {
  Button,
} from '../Button';
import classNames from 'classnames';
import {
  InkChoiceOwnProps,
} from './InkChoiceOwnProps';
import {
  InkChoiceState,
} from './InkChoiceState';
import {
  maxInkChoiceSwipeRight,
} from '../InkContainer/maxInkChoiceSwipeRight';
import {
  Swipeable,
} from '../Swipeable';
import type {
  SwipeCallback,
} from 'react-swipeable/types';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

// refactor this bitch right here to a class
export class InkChoice extends React.PureComponent<
  InkChoiceOwnProps,
  InkChoiceState
> {
  public readonly state: InkChoiceState = {
    swipedRight: 0,
    swiping: false,
  };

  public readonly render = () => {
    const {
      children,
      className,
      disabled,
      isFadingOut,
      name: nameProp,
      maxRotationAngle = 2,
      maxSwipeRight = maxInkChoiceSwipeRight,
      onClick,
      selected,
    } = this.props;

    const {
      swipedRight: curSwipedRight,
      swiping,
    } = this.state;

    const firstChildContent = React.Children.toArray(children)
      .find((child: React.ReactNode): child is string => {
        if (Array.isArray(child)) {
          for (const subchild of child) {
            if (typeof subchild === 'string') {
              return true;
            }
          }
        } else if (typeof child === 'string') {
          return true;
        }

        return false;
      });

    const childIsTombstone = firstChildContent && firstChildContent.trim() === '◼';

    let buttonTitle = nameProp || 'Choice selection';
    if (!nameProp) {
      if (childIsTombstone) {
        buttonTitle = 'Click to continue';
      } else if (firstChildContent) {
        buttonTitle = firstChildContent;
      }
    }


    let curRotation = 0;
    if ((curSwipedRight as number) >= 1 && (maxSwipeRight as number) >= 1) {
      curRotation =
        curSwipedRight /
          maxSwipeRight *
          maxRotationAngle +
          (Math.random() * 2.5);
    }

    return (
      <Swipeable
        className={classNames(
          builtIns['ink-choice-swipeable'],
          'ink-choice-swipeable',
          { swiping },
        )}

        delta={0}
        onSwiping={this.onSwiping}
        onSwiped={this.onSwiped}
        preventDefaultTouchmoveEvent={true}
        style={{
          transform: `translate(${curSwipedRight}px) rotate(${curRotation}deg)`
        }}
      >
        <Button
          className={classNames(
            builtIns['ink-choice'],
            'ink-choice',
            'choice',
            {
              'choice-selection-animation': selected,
              'choice-nonselection-animation': isFadingOut,
              disabled,
            },

            className,
          )}

          role="link"
          title={buttonTitle}
          onClick={onClick}
        >
          <div
            className={classNames(
              builtIns['ink-choice-content'],
              'ink-choice-content',
            )}

            role={childIsTombstone && !buttonTitle ? 'presentation' : 'group'}
          >
            {children}
          </div>
        </Button>
      </Swipeable>
    );
  };

  public readonly onSwiping: SwipeCallback = ({
    absX,
    dir,
  }) => {
    const {
      disabled,
      isFadingOut,
      maxSwipeRight = maxInkChoiceSwipeRight,
      onClick,
    } = this.props;

    const {
      swipedRight,
      swiping,
    } = this.state;

    if (disabled || isFadingOut) {
      return;
    }

    if (dir === 'Right') {
      if (swipedRight >= maxSwipeRight) {
        this.setState({ swiping: false });

        if (typeof onClick === 'function') {
          onClick(null as any);
        }
      } else {
        if (!swiping) {
          this.setState({ swiping: true });
        }

        this.setState({ swipedRight: absX });
      }
    }
  };

  public readonly onSwiped: SwipeCallback = ({ absX }) => {
    const {
      disabled,
      isFadingOut,
      maxSwipeRight = maxInkChoiceSwipeRight,
    } = this.props;

    const { swipedRight } = this.state;

    if (disabled || isFadingOut) {
      return;
    }

    this.setState({
      swiping: false,
      swipedRight: absX >= (maxSwipeRight || 0) ? swipedRight : 0,
    });
  };
}
