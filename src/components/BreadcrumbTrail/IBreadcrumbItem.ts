import {
  INamed,
} from '../../interfaces/INamed';
import {
  IVisibilityTreeAware,
} from './IVisibilityTreeAware';

export interface IBreadcrumbItem extends INamed {
  readonly logo?: string;
  readonly logoAlt?: string;
  readonly title?: string;
  readonly treeSelector?: IVisibilityTreeAware['treeSelector'];
}
