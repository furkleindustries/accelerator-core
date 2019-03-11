export interface IVisibilityTree {
  readonly children: ReadonlyArray<IVisibilityTree>;
  readonly visible: boolean;
}
