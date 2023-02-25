import type {
  CardActionsProps,
} from '@material-ui/core/CardActions';
import type {
  CardHeaderProps,
} from '@material-ui/core/CardHeader';
import type {
  CardProps,
} from '@material-ui/core/Card';

export interface ICardOwnProps extends CardProps {
  readonly actions?: CardActionsProps['children'];
  readonly header?: CardHeaderProps['children'];
  readonly headerTypographyProps?: CardHeaderProps['titleTypographyProps'];
  readonly subheader?: CardHeaderProps['subheader'];
  readonly subheaderTypographyProps?: CardHeaderProps['subheaderTypographyProps'];
}
