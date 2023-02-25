import {
  getReactKey as getReactKeyDefault,
} from './getReactKey';
import {
  cloneElement,
  isValidElement,
  ReactNode,
} from 'react';

export const withKey = (
  lastSeen: ReactNode,
  key?: string | number,
  getReactKey = getReactKeyDefault,
) => {
  if (!lastSeen || !isValidElement(lastSeen)) {
    return lastSeen;
  }

  const props = 'key' in lastSeen.props ?
    {} :
    {
      ...lastSeen.props,
      key: key || getReactKey(),
    };

  return cloneElement(
    lastSeen,
    props,
    lastSeen.props.children,
  );
}