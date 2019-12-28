import {
  Iterated,
} from '../Iterated';
import {
  IteratorProps,
} from './IteratorProps';

import * as React from 'react';

export const Iterator: React.FunctionComponent<IteratorProps> = ({
  children,
  collection,
  filter = () => true,
  mapper = (child) => child,
}) => {
  let output = [];
  for (const item of collection) {
    let finalItem = item;
    if (typeof filter === 'function' && !filter(finalItem)) {
      break;
    }

    if (Array.isArray(children) ||
      (React.isValidElement(children) && children.type !== Iterated))
    {
      finalItem = recursivelyReplaceIterated(children, finalItem);
    }

    if (typeof mapper === 'function') {
      finalItem = mapper(finalItem);
    }

    output.push(finalItem);
  }

  return (
    <>{...output}</>
  );
};

export const recursivelyReplaceIterated = (
  child: React.ReactNode,
  replacement: React.ReactNode,
): React.ReactNode => {
  if (React.isValidElement(child)) {
    if (child.type === Iterated) {
      return replacement;
    }

    return React.cloneElement(child, {
      children: React.Children.map(
        child.props.children,
        recursivelyReplaceIterated,
      ),
    });
  } else if (Array.isArray(child)) {
    return child.map(recursivelyReplaceIterated);
  }

  return child;
};
