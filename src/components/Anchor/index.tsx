import {
  Link,
} from '../Link';
import {
  UrlLink,
} from '../UrlLink';

import * as React from 'react';

export const Anchor = ({
  href,
  ...props
}: Record<string, any>) => {
  /* Return an UrlLink which opens links in a new tab by default if and only
    * if the href value is a string which begins with `https?://`. If you
    * don't like this for any reason, either import and use UrlLink directly,
    * or edit this code in your own codebase. */
  if (typeof href === 'string' && /^https?:\/\//.test(href)) {
    return (
      <UrlLink
        href={href}
        /* Force links to open in a new tab. May be overridden by props. */
        target="_blank"
        {...props}
      />
    ) 
  }

  return (
    <Link
      /* Overridden by props if passageName was provided. */
      passageName={href}
      {...props}
    />
  );
};
