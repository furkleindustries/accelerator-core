import {
  INamed,
} from '../../interfaces/INamed';

export interface IBreadcrumbItem extends INamed {
  readonly path: string;
  readonly logo?: string;
  readonly logoAlt?: string;
  readonly title?: string;
}
