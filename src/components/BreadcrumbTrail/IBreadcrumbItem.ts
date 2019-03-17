export interface IBreadcrumbItem {
  readonly name: string;
  readonly logo?: string;
  readonly logoAlt?: string;
  readonly title?: string;
  readonly treeSelector?: ReadonlyArray<number>;
}
