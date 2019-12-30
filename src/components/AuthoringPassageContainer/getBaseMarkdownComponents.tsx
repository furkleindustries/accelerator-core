/**
 * Do NOT do the below.
 *  
 * `import * as componentsBundle from '../../../bundles/componentsBundle';`
 * 
 * Importing the components bundle in this file will almost certainly produce,
 * especially in testing, cyclic dependencies which will result in undefined
 * modules at runtime. Rather, import each as needed. 
 */

import {
  Article,
} from '../Article';
import {
  Button,
} from '../Button';
import {
  Card,
} from '../Card';
import {
  Checkbox,
} from '../Checkbox';
import {
  Chip,
} from '../Chip';
import {
  CircularProgress,
} from '../CircularProgress';
import {
  ICircularProgressOwnProps,
} from '../CircularProgress/ICircularProgressOwnProps';
import {
  ClickAppend,
} from '../ClickAppend';
import {
  ClickDisappear,
} from '../ClickDisappear';
import {
  ClickPrepend,
} from '../ClickPrepend';
import {
  ClickReplace,
} from '../ClickReplace';
import {
  Clicker,
} from '../Clicker';
import {
  Combination,
} from '../Combination';
import {
  Cycler,
} from '../Cycler';
import {
  CyclingLink,
} from '../CyclingLink';
import {
  Delay,
} from '../Delay';
import {
  Dialog,
} from '../Dialog';
import {
  Divider,
} from '../Divider';
import {
  Else,
} from '../Else';
import {
  ElseIf,
} from '../ElseIf';
import {
  FadeIn,
} from '../FadeIn';
import {
  FadeOut,
} from '../FadeOut';
import {
  Footer,
} from '../Footer';
import {
  GetSound,
} from '../GetSound';
import {
  GetState,
} from '../GetState'
import {
  Grid,
} from '../Grid';
import {
  Header
} from '../Header';
import {
  If,
} from '../If';
import {
  InkContainer
} from '../InkContainer';
import {
  InkSection,
} from '../InkSection';
import {
  Iterated,
} from '../Iterated';
import {
  Iterator,
} from '../Iterator';
import {
  LinearProgress,
} from '../LinearProgress';
import {
  ILinearProgressOwnProps,
} from '../LinearProgress/ILinearProgressOwnProps';
import {
  Link,
} from '../Link';
import {
  List,
} from '../List';
import {
  IListOwnProps,
} from '../List/IListOwnProps';
import {
  NOf,
} from '../NOf';
import {
  OneOf,
} from '../OneOf';
import {
  Paper,
} from '../Paper';
import {
  Permutation,
} from '../Permutation';
import {
  Print,
} from '../Print';
import {
  RestartButton,
} from '../RestartButton';
import {
  RewindButton,
} from '../RewindButton';
import {
  Section,
} from '../Section';
import {
  SetVariable,
} from '../SetVariable';
import {
  Toolbar,
} from '../Toolbar';
import {
  TypographyClassKey,
} from '@material-ui/core/Typography';
import {
  Typography,
} from '../Typography';
import {
  ITypographyOwnProps,
} from '../Typography/ITypographyOwnProps';
import {
  UrlLink,
} from '../UrlLink';
import {
  Variable,
} from '../Variable';

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
      <Link
        /* Overridden by props if passageName was provided. */
        passageName={href}
        {...props}
      />
    );
  },

  article: Article,
  button: Button,
  card: Card,
  chip: Chip,
  'click-append': ClickAppend,
  'click-disappear': ClickDisappear,
  'click-prepend': ClickPrepend,
  'click-replace': ClickReplace,
  clicker: Clicker,
  combination: Combination,
  cycler: Cycler,
  'cycling-link': CyclingLink,
  delay: Delay,
  dialog: Dialog,
  divider: Divider,
  else: Else,
  'else-if': ElseIf,
  elif: ElseIf,
  'fade-in': FadeIn,
  'fade-out': FadeOut,
  footer: Footer,
  'get-sound': GetSound,
  'get-state': GetState,
  grid: Grid,
  header: Header,
  if: If,
  'ink-container': InkContainer,
  'ink-section': InkSection,

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

  iterated: Iterated,
  iterator: Iterator,
  'n-of': NOf,

  ol: ({
    children,
    ...props
  }: IListOwnProps) => <List {...props}>{children}</List>,

  'one-of': OneOf,
  paper: Paper,
  permutation: Permutation,
  print: Print,

  progress: ({
    orientation,
    ...props
  }: (ICircularProgressOwnProps | ILinearProgressOwnProps) & { orientation?: 'circular' | 'linear' }) => (
    orientation === 'circular' ?
      <CircularProgress {...props as ICircularProgressOwnProps} /> :
      <LinearProgress {...props as ILinearProgressOwnProps} />
  ),

  'restart-button': RestartButton,
  'rewind-button': RewindButton,
  section: Section,
  'set-var': SetVariable,
  'set-variable': SetVariable,
  toolbar: Toolbar,

  ul: ({
    children,
    ...props
  }: IListOwnProps) => <List {...props}>{children}</List>,

  'url-link': UrlLink,
  var: Variable,
  variable: Variable,
});

export const getBaseMarkdownComponents = () => ({ ...baseComponents });
