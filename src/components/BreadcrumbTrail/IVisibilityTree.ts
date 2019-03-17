export interface IVisibilityTree {
  readonly children: ReadonlyArray<IVisibilityTree>;
  readonly open: boolean;
  readonly visible: boolean;
}
