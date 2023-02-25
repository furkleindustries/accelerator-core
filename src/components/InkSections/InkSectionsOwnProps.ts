import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  InkSection,
} from '../InkSection';
import type {
  AriaAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react';

export interface InkSectionsOwnProps
  extends
    IClassNameable,
    AriaAttributes,
    Omit<HTMLAttributes<HTMLElement>, 'className'>
{
  readonly content: readonly ReactNode[];
  readonly InkSection?: typeof InkSection;
}
