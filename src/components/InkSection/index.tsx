import classNames from 'classnames';
import {
  InkSectionOwnProps,
} from './InkSectionOwnProps';
import {
  Section as SectionDefault,
} from '../Section';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const InkSection: React.FC<InkSectionOwnProps> = ({
  children,
  className,
  Section = SectionDefault,
  ...props
}) => (
  <Section
    className={classNames(
      builtIns['ink-section'],
      'ink-section',
      className,
    )}

    {...props}
  >
    {children}
  </Section>
);
