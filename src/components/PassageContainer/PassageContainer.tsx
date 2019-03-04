import {
  IPassageContainerOwnProps,
} from './IPassageContainerOwnProps';
import {
  PassageContentsContainerConnected,
} from '../PassageContentsContainer/PassageContentsContainer';
import {
  PassageHeadersConnected,
} from '../PassageHeaders/PassageHeaders';
import {
  PassageFootersConnected,
} from '../PassageFooters/PassageFooters';

import * as React from 'react';

export const PassageContainer = React.forwardRef<HTMLSpanElement, IPassageContainerOwnProps>(({
  footers,
  headers,
  ...passageProps
}, ref) => (
  <div className={`passageContainer ${passageProps.passageObject.name}`}>
    <PassageHeadersConnected
      headers={headers}
      {...passageProps}
    />

    {/* Provide a ref which can be scrolled to externally. */}
    <span className="scroll" ref={ref}></span>

    <PassageContentsContainerConnected {...passageProps} />

    <PassageFootersConnected
      footers={footers}
      {...passageProps}
    />
  </div>
));
