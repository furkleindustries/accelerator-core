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
  Anchor,
} from '../components/Anchor';
import {
  Article,
} from '../components/Article';
import {
  Button,
} from '../components/Button';
import {
  Card,
} from '../components/Card';
import {
  Chip,
} from '../components/Chip';
import {
  ClickAppend,
} from '../components/ClickAppend';
import {
  ClickDisappear,
} from '../components/ClickDisappear';
import {
  ClickPrepend,
} from '../components/ClickPrepend';
import {
  ClickReplace,
} from '../components/ClickReplace';
import {
  Clicker,
} from '../components/Clicker';
import {
  Combination,
} from '../components/Combination';
import {
  Cycler,
} from '../components/Cycler';
import {
  CyclingLink,
} from '../components/CyclingLink';
import {
  Delay,
} from '../components/Delay';
import {
  Dialog,
} from '../components/Dialog';
import {
  Divider,
} from '../components/Divider';
import {
  Else,
} from '../components/Else';
import {
  ElseIf,
} from '../components/ElseIf';
import {
  FadeIn,
} from '../components/FadeIn';
import {
  FadeOut,
} from '../components/FadeOut';
import {
  Footer,
} from '../components/Footer';
import {
  GetSound,
} from '../components/GetSound';
import {
  GetState,
} from '../components/GetState'
import {
  Grid,
} from '../components/Grid';
import {
  Header
} from '../components/Header';
import {
  If,
} from '../components/If';
import {
  InkContainer
} from '../components/InkContainer';
import {
  InkSection,
} from '../components/InkSection';
import {
  Input,
} from '../components/Input';
import {
  Iterated,
} from '../components/Iterated';
import {
  Iterator,
} from '../components/Iterator';
import {
  ListItem,
} from '../components/ListItem';
import {
  NOf,
} from '../components/NOf';
import {
  OneOf,
} from '../components/OneOf';
import {
  OrderedList,
} from '../components/OrderedList';
import {
  Paper,
} from '../components/Paper';
import {
  Permutation,
} from '../components/Permutation';
import {
  Print,
} from '../components/Print';
import {
  Progress,
} from '../components/Progress';
import {
  RestartButton,
} from '../components/RestartButton';
import {
  RewindButton,
} from '../components/RewindButton';
import {
  Section,
} from '../components/Section';
import {
  SetVariable,
} from '../components/SetVariable';
import {
  Toolbar,
} from '../components/Toolbar';
import {
  TypographyClassKey,
} from '@material-ui/core/Typography';
import {
  Typography,
} from '../components/Typography';
import {
  ITypographyOwnProps,
} from '../components/Typography/ITypographyOwnProps';
import {
  UnorderedList,
} from '../components/UnorderedList';
import {
  UrlLink,
} from '../components/UrlLink';
import {
  Variable,
} from '../components/Variable';

/**
 * See note at top before adding any new imports.
 */

import * as React from 'react';

/**
 * @todo Make these real, named components.
 */
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

/**
 * @todo Make these real, named components.
 */
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

  a: Anchor,
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
  input: Input,
  iterated: Iterated,
  iterator: Iterator,
  li: ListItem,
  'n-of': NOf,
  ol: OrderedList,
  'one-of': OneOf,
  paper: Paper,
  permutation: Permutation,
  print: Print,
  progress: Progress,
  'restart-button': RestartButton,
  'rewind-button': RewindButton,
  section: Section,
  'set-var': SetVariable,
  'set-variable': SetVariable,
  toolbar: Toolbar,
  ul: UnorderedList,
  'url-link': UrlLink,
  var: Variable,
  variable: Variable,
});

export type TComponentMapShape = typeof baseComponents;

export const getTagNameToComponentMap = () => {
  return { ...baseComponents };
};
