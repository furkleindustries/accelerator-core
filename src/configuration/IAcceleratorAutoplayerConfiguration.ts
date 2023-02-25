export interface IAcceleratorAutoplayerConfiguration {
  // Defaults to false.
  readonly active?: boolean;

  // Defaults to true.
  readonly scroll?: boolean;

  // Defaults to 20000.
  readonly baseDelayTime?: number;

  // Defaults to 0.5.
  readonly minDelayRatio?: number;

  // Defaults to 15.
  readonly maxDelayRatio?: number;

  readonly getRandomFactor?: () => number;
  readonly randomStrictBounding?: boolean;
}
