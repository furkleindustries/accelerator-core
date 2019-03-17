import {
  TypographyProps,
} from '@material-ui/core/Typography';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface ITypographyOwnProps extends TypographyProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
}
