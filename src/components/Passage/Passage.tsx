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
  plugins,
  ...passageProps
}, ref) => (
  <>
    <SkipToContentLink />

    {
      /* Weird bug where react-redux is arguing with the types
        * since the last major version. Remember to file against
        * https://github.com/reduxjs/react-redux */
      // @ts-ignore
      <PassageHeadersConnected
        headers={headers}
        {...passageProps}
      />
    }

    <SkipToContentLinkDestination />

    <span className="scroll" ref={ref}></span>
    <PassageContentsContainerConnected
      plugins={plugins}
      {...passageProps}
    />

    {
      /* See above re: react-redux bug. */
      // @ts-ignore
      <PassageFootersConnected
        footers={footers}
        {...passageProps}
      />
    }
  </>
));
