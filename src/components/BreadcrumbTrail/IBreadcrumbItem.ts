import {
  INamed,
} from '../../interfaces/INamed';
import {
  TreeSelector,
} from './TreeSelector';

export interface IBreadcrumbItem extends INamed {
  readonly logo?: string;
  readonly logoAlt?: string;
  readonly title?: string;
  readonly treeSelector?: TreeSelector;
}
