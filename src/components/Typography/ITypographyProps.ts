import type {
  TypographyProps,
} from '@material-ui/core';
import type {
  AllHTMLAttributes,
  AriaAttributes,
} from 'react';

export interface ITypographyProps
  extends
    AriaAttributes,
    Omit<AllHTMLAttributes<HTMLElement>, 'color'>,
    Omit<TypographyProps, 'color'>
{
  readonly align?: TypographyProps['align'];
  readonly component?:
    'code' |
      'div' |
      'em' |
      'h1' |
      'h2' |
      'h3' |
      'h4' |
      'h5' |
      'h6' |
      'label' |
      'p' |
      'span' |
      'strong' |
      'time';

  readonly paragraph?: boolean;
  readonly variant?: TypographyProps['variant'];
}
