import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ISoundManagerAware,
} from '../../interfaces/ISoundManagerAware';
import {
  AriaAttributes,
  HTMLAttributes,
} from 'react';

export interface ISoundManagerViewOwnProps
  extends
    IClassNameable,
    ISoundManagerAware,
    AriaAttributes,
    Omit<HTMLAttributes<HTMLElement>, 'className'>
{
  readonly listRole?: HTMLAttributes<HTMLElement>['role'];
}
