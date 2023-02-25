import classNames from 'classnames';
import {
  IPassageContainerOwnProps,
} from './IPassageContainerOwnProps';
import {
  PassageContentContainer,
} from '../PassageContentContainer';
import {
  PassageHeadersConnected,
} from '../PassageHeaders';
import {
  PassageFootersConnected,
} from '../PassageFooters';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const PassageContainer = React.forwardRef<HTMLSpanElement, IPassageContainerOwnProps>(({
  config,
  footers,
  headers,
  passageObject: passage,  
  passageObject: { name: passageName },
  ...passageProps
}, ref) => (
  <div
    className={classNames(
      builtIns['passage-container'],
      'passage-container',
      passageName,
    )}

    role="main"
    aria-roledescription="Passage contents"
  >
    <PassageHeadersConnected
      {...passageProps}

      config={config}
      headers={headers}
      passageObject={passage}
    />

    {/* Provide a ref which can be scrolled to externally. */}
    <span
      className={classNames('scroll')}
      role="presentation"
      aria-roledescription="scroll target"
      ref={ref}
    ></span>

    <PassageContentContainer
      {...passageProps}

      config={config}
      passageObject={passage}
    />

    <PassageFootersConnected
      {...passageProps}

      config={config}
      footers={footers}
      passageObject={passage}
    />
  </div>
));
