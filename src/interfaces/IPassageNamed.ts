import {
  registry,
} from '../../passages/passages-manifest';

type RegistryType = typeof registry;

export interface IPassageNamed {
  readonly passageName: keyof RegistryType;
}
