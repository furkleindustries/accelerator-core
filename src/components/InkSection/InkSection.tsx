import {
  Button,
} from '../Button';
import classNames from 'classnames';
import {
  InkSectionOwnProps,
} from './InkSectionOwnProps';
import {
  List,
} from '../List';
import {
  Section,
} from '../Section';

import * as React from 'react'

import styles from './index.less';

export const InkSection: React.FunctionComponent<InkSectionOwnProps> = ({
  children,
  className,
  onClick,
  story,
}) => (
  <Section
    className={classNames(
      styles.choicesSection,
      'choicesSection',
      className,
    )}
  >
    {children}

    <List className={classNames(styles.choiceList, 'choiceList')}>
      {story.currentChoices.map(({ text }, key) => (
        <div
          className={classNames(styles.choice, 'choice')}
          key={key}
        >
          <Button
            className={classNames(styles.choiceButton, 'choiceButton')}
            onClick={onClick.bind(null, key)}
          >
            <div
              className={classNames(
                styles.choiceContainer,
                'choiceContainer',
              )}
            >
              {text}
            </div>
          </Button>
        </div>
      ))}
    </List>
  </Section>
);
