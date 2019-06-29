import {
  Button,
} from '../Button/Button';
import classNames from 'classnames';
import {
  InkSectionOwnProps,
} from './InkSectionOwnProps';
import {
  List,
} from '../List/List';
import {
  ListItem,
} from '../ListItem/ListItem';
import {
  parsePlainTextAndReactElements,
} from '../../functions/parsePlainTextAndReactElements';
import {
  Section,
} from '../Section/Section';

import * as React from 'react'

import styles from './InkSection.less';

export const InkSection: React.FunctionComponent<InkSectionOwnProps> = ({
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
      <List className={classNames(styles.choiceList, 'choiceList')}>
        {story.currentChoices.map(({ text }, index) => (
          <ListItem className={classNames(styles.choice, 'choice')}>
            <Button
              className={classNames(styles.choiceButton, 'choiceButton')}
              onClick={onClick.bind(index)}
            >
              {parsePlainTextAndReactElements(text, { ...childProps })}
            </Button>
          </ListItem>
        ))}
      </List>
    </Section>
  );
};