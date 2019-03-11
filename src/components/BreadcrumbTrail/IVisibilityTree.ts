export interface IVisibilityTree {
  readonly children: IVisibilityTree[];
  readonly visible: boolean;
}
