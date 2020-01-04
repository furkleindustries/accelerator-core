import classnames from 'classnames';
import {
  IPassageContainerOwnProps,
} from './IPassageContainerOwnProps';
import {
  PassageContentContainerConnected,
} from '../PassageContentContainer';
import {
  PassageHeadersConnected,
} from '../PassageHeaders';
import {
  PassageFootersConnected,
} from '../PassageFooters';

import * as React from 'react';

export const PassageContainer = React.forwardRef<HTMLSpanElement, IPassageContainerOwnProps>(({
  config,
  footers,
  headers,
  passage,
  passage: { name },
  ...passageProps
}, ref) => (
  <div className={classnames(
    'passageContainer',
    name,
  )}>
    <PassageHeadersConnected
      config={config}
      headers={headers}
      passage={passage}
      {...passageProps}
    />

    {/* Provide a ref which can be scrolled to externally. */}
    <span
      className={classnames('scroll')}
      ref={ref}
    ></span>

    <PassageContentContainerConnected
      config={config}
      passage={passage}
      {...passageProps}
    />

    <PassageFootersConnected
      config={config}
      footers={footers}
      passage={passage}
      {...passageProps}
    />
  </div>
));
