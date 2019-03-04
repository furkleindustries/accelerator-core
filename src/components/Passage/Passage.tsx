import {
  IPassageOwnProps,
} from './IPassageOwnProps';
import {
  PassageContentsContainerConnected,
} from '../PassageContentsContainer/PassageContentsContainer';
import {
  PassageHeadersConnected,
} from '../PassageHeaders/PassageHeaders';
import {
  PassageFootersConnected,
} from '../PassageFooters/PassageFooters';
import {
  SkipToContentLink,
} from '../SkipToContentLink/SkipToContentLink';
import {
  SkipToContentLinkDestination,
} from '../SkipToContentLinkDestination/SkipToContentLinkDestination';

import * as React from 'react';

export const Passage = React.forwardRef<HTMLSpanElement, IPassageOwnProps>(({
  footers,
  headers,
  ...passageProps
}, ref) => (
  <>
    <SkipToContentLink />

    <PassageHeadersConnected
      headers={headers}
      {...passageProps}
    />

    <SkipToContentLinkDestination />

    {/* Provide a ref which can be scrolled to externally. */}
    <span className="scroll" ref={ref}></span>

    <PassageContentsContainerConnected {...passageProps} />

    <PassageFootersConnected
      footers={footers}
      {...passageProps}
    />
  </>
));
