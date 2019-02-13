export interface ILoadingScreenOwnProps {
  readonly bodyText: string;
  readonly descriptions?: string[];
  readonly progressMax: number;
  readonly progressStart: number;
  readonly logoPath: string;
  readonly title: string;
  updateTicks(ticks: number): void;
}
