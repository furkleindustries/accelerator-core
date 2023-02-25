export interface IAutoplayerWeightedDelayArgs {
  readonly choicesContainerElem: Element;
  readonly newContentElem: Element;
  readonly baseFactor: number;
  readonly minDelayRatio: number;
  readonly maxDelayRatio: number;
  readonly getRandomFactor: () => number;
  readonly randomStrictBounding: boolean;
}
