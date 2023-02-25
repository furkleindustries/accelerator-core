import {
  IButtonOwnProps,
} from '../Button/IButtonOwnProps';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IRestartButtonOwnProps extends IButtonOwnProps {
  readonly restartButtonLabel?: ReactNodeWithoutNullOrUndefined;
  readonly ref?: string & ((instance: HTMLButtonElement | null) => void);
}
