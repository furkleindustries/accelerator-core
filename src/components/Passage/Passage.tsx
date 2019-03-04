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

import * as React from 'react';

import styles from '../../../passages/_global-styles/built-ins.scss';

export const Passage = React.forwardRef<HTMLSpanElement, IPassageOwnProps>(({
  footers,
  headers,
  ...passageProps
}, ref) => (
  <div className={`passage ${passageProps.passageObject.name} ${styles.passage}`}>
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
