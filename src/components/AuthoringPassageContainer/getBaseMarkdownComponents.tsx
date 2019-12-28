import {
  Checkbox,
} from '../Checkbox';
import {
  CircularProgress,
} from '../CircularProgress';
import * as componentsBundle from '../../../bundles/componentsBundle';
import {
  getReactMarkdownComponentKeyValuePair,
} from './getReactMarkdownComponentKeyValuePair';
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
  ...Object.keys(componentsBundle).reduce((retObj, key) => ({
    ...retObj,
    ...getReactMarkdownComponentKeyValuePair(key, componentsBundle[key]), 
  }), {}),

  ...typeCompList.reduce((obj, val, index) => (
    Object.assign(obj, { [typographies[index] as string]: val })
  ), {}),

  a: ({
    href,
    ...props
  }: Record<string, any>) => {
    /* Return an UrlLink which opens links in a new tab by default if and only
     * if the href value is a string which begins with `https?://`. If you
     * don't like this for any reason, either import and use UrlLink directly,
     * or edit this code in your own codebase. */
    if (typeof href === 'string' && /^https?:\/\//.test(href)) {
      return (
        <UrlLink
          href={href}
          /* Force links to open in a new tab. May be overridden by props. */
          target="_blank"
          {...props}
        />
      ) 
    }

    return (
      <componentsBundle.Link
        /* Overridden by props if passageName was provided. */
        passageName={href}
        {...props}
      />
    );
  },

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
