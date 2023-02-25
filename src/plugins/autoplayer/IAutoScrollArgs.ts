import type {
  EasingCurves,
} from 'sound-manager';
import {
  IAcceleratorConfigNormalized,
} from '../../configuration/IAcceleratorConfigNormalized';

export interface IAutoScrollArgs {
  readonly duration: number;
  readonly loggers: IAcceleratorConfigNormalized['loggers'];
  readonly textPane: HTMLDivElement;
  readonly debug?: boolean;
  readonly easing?: EasingCurves;
  readonly shouldAbort?: () => void;
}
