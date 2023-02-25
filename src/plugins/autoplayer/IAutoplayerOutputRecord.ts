export interface IAutoplayerOutputRecord {
  readonly elapsedTimeSinceStart: number;
  readonly occurrenceTime: number;
  readonly text: string;
  readonly type: 'choice' | 'choice-selection' | 'text';
}
