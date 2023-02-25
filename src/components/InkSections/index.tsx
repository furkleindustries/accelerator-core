import classNames from 'classnames';
import {
  getTagNameToComponentMap,
} from '../../functions/getTagNameToComponentMap';
import {
  InkSectionsOwnProps,
} from './InkSectionsOwnProps';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const InkSections: React.FC<InkSectionsOwnProps> = React.memo(({
  className,
  content,
  InkSection = getTagNameToComponentMap().InkSection,
}) => (
  <div
    className={classNames(
      builtIns['ink-sections-block'],
      'ink-sections-block',
    )}

    aria-live="polite"
    role="log"
    aria-roledescription="Story content"
  >
    {content.map((turnContent, key) => (
      <div
        className={classNames(
          builtIns['ink-section-block'],
          'ink-section-block',
          className,
        )}

        key={key}
        role="group"
      >
        <InkSection
          aria-current={key === content.length - 1}
          role="article"
        >
          {turnContent}
        </InkSection>
      </div>
    ))}
  </div>
));

InkSections.displayName = 'InkSections';
