export interface IAutoplayerWeightDelayFactorArgs {
  readonly characters: string[];
  readonly charactersNoWhitespace: string[];
  readonly pixelHeight: number;
  readonly words: string[];
  readonly minDelayRatio: number;
  readonly maxDelayRatio: number;
  readonly getRandomFactor: () => number;
  readonly randomStrictBounding: boolean;
}
