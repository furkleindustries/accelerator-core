import classnames from 'classnames';
import {
  IPassageContainerOwnProps,
} from './IPassageContainerOwnProps';
import {
  PassageContentContainerConnected,
} from '../PassageContentContainer/PassageContentContainer';
import {
  PassageHeadersConnected,
} from '../PassageHeaders/PassageHeaders';
import {
  PassageFootersConnected,
} from '../PassageFooters/PassageFooters';

import * as React from 'react';

export const PassageContainer = React.forwardRef<HTMLSpanElement, IPassageContainerOwnProps>(({
  config,
  footers,
  headers,
  ...passageProps
}, ref) => (
  <div className={classnames(
    'passageContainer',
    passageProps.passageObject.name,
  )}>
    <PassageHeadersConnected
      config={config}
      headers={headers}
      {...passageProps}
    />

    {/* Provide a ref which can be scrolled to externally. */}
    <span
      className={classnames('scroll')}
      ref={ref}
    ></span>

    <PassageContentContainerConnected
      config={config}
      {...passageProps}
    />

    <PassageFootersConnected
      footers={footers}
      {...passageProps}
      config={config}
    />
  </div>
));
