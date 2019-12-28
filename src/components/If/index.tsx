import {
  Else,
} from '../Else';
import {
  ElseIf,
} from '../ElseIf';
import {
  IfProps,
} from './IfProps';

import * as React from 'react';

export const If: React.FunctionComponent<IfProps> = ({
  children,
  condition,
}) => {
  if (typeof condition === 'function') {
    if (condition(children)) {
      return <>{...strip(children)}</>;
    }
  } else if (condition) {
    return <>{...strip(children)}</>;
  }

  return findValidFallbackCondition(children);
};

export const strip = (children: React.ReactChildren) => {
  return React.Children.toArray(
    React.Children.toArray<React.ReactNode>(children).filter((child) => {
      if (React.isValidElement(child) &&
        (child.type === Else || child.type === ElseIf))
      {
        return false;
      }

      return true;
    })
  );
};

export const findValidFallbackCondition = (children: React.ReactChildren) => {
  for (const child of React.Children.toArray<React.ReactNode>(children)) {
    if (React.isValidElement(child)) {
      if (child.type === ElseIf) {
        if (typeof child.props.condition === 'function') {
          if (child.props.condition(child.props.children)) {
            return child;
          }
        } else if (child.props.condition) {
          return child;
        }
      } else if (child.type === Else) {
        return child;
      }
    }
  }

  return null;
};
