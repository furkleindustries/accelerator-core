import {
  INamed,
} from '../../interfaces/INamed';

export interface IVariableProps extends INamed {
  readonly doError?: boolean;
}
