export interface ILoadingScreenOwnProps {
  readonly progressMax: number;
  readonly progressStart: number;
  readonly logoPath: string;
  readonly title: string;
  addProgressTicks(ticks: number): void;
}
