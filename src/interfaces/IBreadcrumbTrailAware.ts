import {
  IBreadcrumbItem,
} from '../components/Breadcrumb/IBreadcrumbItem';
import {
  IVisibilityTree,
} from '../components/BreadcrumbTrail/IVisibilityTree';

export interface IBreadcrumbTrailAware {
  readonly treeSelector?: ReadonlyArray<number>;
  getBreadcrumbProps?(): {
    readonly breadcrumbTrail: ReadonlyArray<IBreadcrumbItem>;
    readonly visibilityTree: IVisibilityTree;
    addBreadcrumb(crumb: IBreadcrumbItem): void;
    removeBreadcrumb(): void;
  };
}
