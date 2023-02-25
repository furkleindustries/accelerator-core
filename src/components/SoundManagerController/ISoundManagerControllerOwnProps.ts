import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  INoChildren,
} from '../../interfaces/INoChildren';
import {
  AriaAttributes,
  HTMLAttributes,
} from 'react';

export interface ISoundManagerControllerOwnProps
  extends
    IClassNameable,
      AriaAttributes,
      Omit<HTMLAttributes<HTMLElement>, 'className'>
{
  readonly children?: INoChildren;
}
