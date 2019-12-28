import * as React from 'react';

export const Print: React.FunctionComponent = ({ children }) => {
  let retVal: any;
  if (children === null || children === undefined) {
    retVal = null;
  } else if (typeof children === 'boolean') {
    retVal = String(children);
  } else if (typeof children === 'string') {
    retVal = String(children);
  } else if (typeof children === 'object') {
    if (React.isValidElement(children)) {
      retVal = children;
    } else {
      retVal = JSON.stringify(children, null, 4);
    }
  } else {
    retVal = String(children);
  }

  return (
    <>{retVal}</>
  );
};
