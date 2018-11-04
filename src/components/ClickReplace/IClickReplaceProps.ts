import {
  ReactNode,
} from 'react';

export interface IClickReplaceOwnProps {
  children: ReactNode;
  className?: string;
  replaceWith: ReactNode;
}
