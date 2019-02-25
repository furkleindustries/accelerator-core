import {
  CardProps,
} from '@material-ui/core/Card';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface ICardOwnProps extends CardProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
}
