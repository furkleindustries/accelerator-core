import {
  IClassNameable,
} from '../../interfaces/IClassNameable';

export interface IRippleOwnProps extends IClassNameable {
  readonly rippleX: number;
  readonly rippleY: number;
  readonly in?: boolean;
  readonly onExited?: (...args: any[]) => any;
  readonly pulsate?: boolean;
  readonly rippleSize?: number;
  readonly timeout?: number;
}