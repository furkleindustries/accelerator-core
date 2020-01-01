import {
  Button,
} from '../Button';
import {
  Choice,
} from '../../../lib/ink/inkjs/src/Choice';
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
  choices,
  choicesVisible,
  className,
  onClick,
}) => (
  <Section
    className={classNames(
      styles.choicesSection,
      'choicesSection',
      className,
    )}
  >
    {children}

    {choicesVisible ?
      <List className={classNames(styles.choiceList, 'choiceList')}>
        {(choices as Choice[]).map(({ text }, key) => (
          <div
            className={classNames(styles.choice, 'choice')}
            key={key}
          >
            <Button
              className={classNames(styles.choiceButton, 'choiceButton')}
              onClick={() => onClick(key)}
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
      </List> :
      null}
  </Section>
);
