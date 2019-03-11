import {
  IHideable,
} from '../../interfaces/IHideable';

export interface IBreadcrumbItem extends IHideable {
  readonly name: string;
  readonly logo?: string;
  readonly logoAlt?: string;
  readonly title?: string;
}
