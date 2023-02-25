import {
  isPhrasingContentElement,
} from './isPhrasingContentElement';
import {
  Children,
  isValidElement,
  ReactElement,
} from 'react';

export const containsNonPhrasingContent = (
  elem: ReactElement<Record<string, any>>,
) => {
  if (!elem || !isValidElement(elem)) {
    return false;
  } else if (!isPhrasingContentElement(elem)) {
    return true;
  }

  const foundList: boolean[] = Children.map(
    elem.props.children,
    (node) => containsNonPhrasingContent(node as any),
  ).flat(100);

  return foundList.filter(Boolean).length === foundList.length;
};
