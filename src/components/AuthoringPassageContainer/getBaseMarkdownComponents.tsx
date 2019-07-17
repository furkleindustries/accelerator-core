import {
  Article,
} from '../Article';
import {
  Button,
} from '../Button';
import {
  Checkbox,
} from '../Checkbox';
import {
  CircularProgress,
} from '../CircularProgress';
import * as componentsBundle from '../../../bundles/componentsBundle';
import {
  Dialog,
} from '../Dialog';
import {
  Footer,
} from '../Footer';
import {
  Header,
} from '../Header';
import {
  ICircularProgressOwnProps,
} from '../CircularProgress/ICircularProgressOwnProps';
import {
  ILinearProgressOwnProps,
} from '../LinearProgress/ILinearProgressOwnProps';
import {
  IListOwnProps,
} from '../List/IListOwnProps';
import {
  ITypographyOwnProps,
} from '../Typography/ITypographyOwnProps';
import {
  LinearProgress,
} from '../LinearProgress';
import {
  List,
} from '../List';
import {
  Section,
} from '../Section/Section';
import {
  TypographyClassKey,
} from '@material-ui/core/Typography';
import {
  Typography,
} from '../Typography';
import {
  UrlLink,
} from '../UrlLink';

import * as React from 'react';

export const typographies: React.ElementType[] = [
  'address',
  'b',
  'blockquote',
  'caption',
  'code',
  'del',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'i',
  'ins',
  'label',
  'sub',
  'sup',
  'p',
  'q',
  'span',
  'time',
];

export const body1Tags: React.ElementType[] = [
  'address',
  'b',
  'blockquote',
  'code',
  'del',
  'em',
  'i',
  'ins',
  'label',
  'p',
  'q',
  'span',
  'time',
];

export const getTypography = (key: React.ElementType | 'body2') => {
  let type: TypographyClassKey;
  if (body1Tags.includes(key as React.ElementType)) {
    type = 'body1';
  } else if (key === 'sub' || key === 'sup') {
    type = 'caption';
  } else {
    type = key as TypographyClassKey;
  }

  /* Weird typing bugs in passing these args. */
  const Component: React.FunctionComponent = ({
    children,
    ...props
  }: ITypographyOwnProps) => (
    <Typography
      component={key as any}
      variant={type as any}
      {...props}
    >
      {children}
    </Typography>
  );

  return Component;
};

const typeCompList = typographies.map(getTypography);

const baseComponents = Object.freeze({
  ...componentsBundle,

  ...typeCompList.reduce((obj, val, index) => (
    Object.assign(obj, { [typographies[index] as string]: val })
  ), {}),

  a: UrlLink,
  article: Article,
  button: Button,
  dialog: Dialog,
  footer: Footer,
  header: Header,

  input: ({
    children,
    orientation,
    type,
    ...props
  }: Record<any, any> & { type?: string }) => {
    if (type === 'checkbox') {
      return <Checkbox {...props}>{children}</Checkbox>;
    }

    return <input {...props} />;
  },

  ol: ({
    children,
    ...props
  }: IListOwnProps) => <List {...props}>{children}</List>,

  section: Section,

  progress: ({
    orientation,
    ...props
  }: (ICircularProgressOwnProps | ILinearProgressOwnProps) & { orientation?: 'circular' | 'linear' }) => (
    orientation === 'circular' ?
      <CircularProgress {...props as ICircularProgressOwnProps} /> :
      <LinearProgress {...props as ILinearProgressOwnProps} />
  ),

  ul: ({
    children,
    ...props
  }: IListOwnProps) => <List {...props}>{children}</List>,
});

export const getBaseMarkdownComponents = () => ({ ...baseComponents });
