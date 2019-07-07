import classNames from 'classnames';
import {
  InkSectionOwnProps,
} from './InkSectionOwnProps';
import {
  List,
} from '../List/List';
import {
  parsePlainTextAndReactElements,
} from '../../functions/parsePlainTextAndReactElements';
import {
  Section,
} from '../Section/Section';

import * as React from 'react'

import styles from './InkSection.less';

export const InkSection: React.FunctionComponent<InkSectionOwnProps> = ({
  children,
  parseProps: childProps,
  className,
  onClick,
  story,
}) => {
  return (
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
            <button
              className={classNames(styles.choiceButton, 'choiceButton')}
              onClick={onClick.bind(null, key)}
            >
              <div
                className={classNames(
                  styles.choiceContainer,
                  'choiceContainer',
                )}
              >
                {parsePlainTextAndReactElements(text, { ...childProps })}
              </div>
            </button>
          </div>
        ))}
      </List>
    </Section>
  );
};