import {
  IAcceleratorAutoplayerConfiguration,
} from './IAcceleratorAutoplayerConfiguration';

export interface IAcceleratorAutoplayerConfigurationNormalized
  extends IAcceleratorAutoplayerConfiguration
{
  readonly active: boolean;
  readonly scroll: boolean;
  readonly baseDelayTime: number;
  readonly minDelayRatio: number;
  readonly maxDelayRatio: number;
  readonly getRandomFactor: () => number;
  readonly randomStrictBounding: boolean;

  // Used to automate choices non-randomly. Not implemented yet.
  readonly inkChoices?: Array<number | Array<any>>;
}
