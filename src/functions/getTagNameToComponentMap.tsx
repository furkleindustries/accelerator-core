/**
 * Do NOT do the below.
 *  
 * `import * as componentsBundle from '../../../bundles/componentsBundle';`
 * 
 * Importing the components bundle in this file will produce cyclic and
 * unresolvable dependencies, which will result in broken builds or undefined
 * modules at runtime. Instead, import each as needed from src/components/. 
 */

// This is where your authored component mutations are imported -- don't delete
// this definition.
import {
  authorComponentMutations,
} from '../../passages/_components/authorComponentsMutations';

import {
  Address,
} from '../components/Address';
import {
  AppBar,
} from '../components/AppBar';
import {
  AppContextConsumerWrapper,
} from '../components/AppContextConsumerWrapper';
import {
  Anchor,
} from '../components/Anchor';
import {
  Article,
} from '../components/Article';
import {
  Blockquote,
} from '../components/Blockquote';
import {
  Breadcrumb,
} from '../components/Breadcrumb';
import {
  BreadcrumbTrail,
} from '../components/BreadcrumbTrail';
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
  CircularProgress,
} from '../components/CircularProgress';
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
  DebugConnectedTreeNode,
} from '../components/DebugConnectedTreeNode';
import {
  DebugNodeArrow,
} from '../components/DebugNodeArrow';
import {
  DebugObjectInspector,
} from '../components/DebugObjectInspector';
import {
  DebugObjectLabel,
} from '../components/DebugObjectLabel';
import {
  DebugObjectName,
} from '../components/DebugObjectName';
import {
  DebugObjectPreview,
} from '../components/DebugObjectPreview';
import {
  DebugObjectRootLabel,
} from '../components/DebugObjectRootLabel';
import {
  DebugObjectValue,
} from '../components/DebugObjectValue';
import {
  DebugTreeNode,
} from '../components/DebugTreeNode';
import {
  DebugTreeView,
} from '../components/DebugTreeView';
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
  Drawer,
} from '../components/Drawer';
import {
  Else,
} from '../components/Else';
import {
  ElseIf,
} from '../components/ElseIf';
import {
  End,
} from '../components/End';
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
  InkChoice,
} from '../components/InkChoice';
import {
  InkChoicesContainer,
} from '../components/InkChoicesContainer';
import {
  InkContainer
} from '../components/InkContainer';
import {
  InkSection,
} from '../components/InkSection';
import {
  InkSections,
} from '../components/InkSections';
import {
  Iterated,
} from '../components/Iterated';
import {
  Iterator,
} from '../components/Iterator';
import {
  LinearProgress,
} from '../components/LinearProgress';
import {
  Link,
} from '../components/Link';
import {
  List,
} from '../components/List';
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
  PlaySound,
} from '../components/PlaySound';
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
  SoundController,
} from '../components/SoundController';
import {
  SoundGroupController,
} from '../components/SoundGroupController';
import {
  SoundGroupView,
} from '../components/SoundGroupView';
import {
  SoundGroupViewTitle,
} from '../components/SoundGroupViewTitle';
import {
  SoundManagerView,
} from '../components/SoundManagerView';
import {
  SoundView,
} from '../components/SoundView';
import {
  SoundViewLabel,
} from '../components/SoundViewLabel';
import {
  SoundViewTitle,
} from '../components/SoundViewTitle';
import {
  StopSound,
} from '../components/StopSound';
import {
  StoryOptionsList,
} from '../../src/components/StoryOptionsList';
import {
  Swipeable,
} from '../components/Swipeable';
import {
  SwipeableDrawer,
} from '../components/SwipeableDrawer';
import {
  Tab,
} from '../components/Tab';
import {
  Tabs,
} from '../components/Tabs';
import {
  Toolbar,
} from '../components/Toolbar';
import {
  TypographyClassKey,
  TypographyProps,
} from '@material-ui/core/Typography';
import {
  Typography,
} from '../components/Typography';
import {
  UnorderedList,
} from '../components/UnorderedList';
import {
  UpdateSound,
} from '../components/UpdateSound';
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
  const Component: React.FC<TypographyProps> = ({
    children,
    ...props
  }) => (
    <Typography
      // @ts-ignore
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

  address: Address,
  Address,
  'app-bar': AppBar,
  AppBar,
  'app-context-consumer-wrapper': AppContextConsumerWrapper,
  AppContextConsumerWrapper,
  Anchor,
  Article,
  article: Article,
  blockquote: Blockquote,
  Blockquote,
  breadcrumb: Breadcrumb,
  Breadcrumb,
  'breadcrumb-trail': BreadcrumbTrail,
  BreadcrumbTrail,
  button: Button,
  Button,
  card: Card,
  Card,
  'circular-progress': CircularProgress,
  CircularProgress,
  chip: Chip,
  Chip,
  'click-append': ClickAppend,
  ClickAppend,
  'click-disappear': ClickDisappear,
  ClickDisappear,
  'click-prepend': ClickPrepend,
  ClickPrepend,
  'click-replace': ClickReplace,
  ClickReplace,
  clicker: Clicker,
  Clicker,
  combination: Combination,
  Combination,
  cycler: Cycler,
  Cycler,
  'cycling-link': CyclingLink,
  CyclingLink,
  'debug-connected-tree-node': DebugConnectedTreeNode,
  DebugConnectedTreeNode,
  'debug-node-arrow': DebugNodeArrow,
  DebugNodeArrow,
  'debug-object-inspectpr': DebugObjectInspector,
  DebugObjectInspector,
  'debug-object-label': DebugObjectLabel,
  DebugObjectLabel,
  'debug-object-name': DebugObjectName,
  DebugObjectName,
  'debug-object-preview': DebugObjectPreview,
  DebugObjectPreview,
  'debug-object-root-label': DebugObjectRootLabel,
  DebugObjectRootLabel,
  'debug-object-value': DebugObjectValue,
  DebugObjectValue,
  'debug-tree-node': DebugTreeNode,
  DebugTreeNode,
  'debug-tree-view': DebugTreeView,
  DebugTreeView,
  delay: Delay,
  Delay,
  dialog: Dialog,
  Dialog,
  divider: Divider,
  Divider,
  drawer: Drawer,
  Drawer,
  else: Else,
  Else,
  'else-if': ElseIf,
  ElseIf,
  elif: ElseIf,
  Elif: ElseIf,
  end: End,
  End,
  'fade-in': FadeIn,
  FadeIn,
  'fade-out': FadeOut,
  FadeOut,
  footer: Footer,
  Footer,
  'get-state': GetState,
  GetState,
  grid: Grid,
  Grid,
  header: Header,
  Header,
  if: If,
  If,
  'ink-choice': InkChoice,
  InkChoice,
  'ink-choices-container': InkChoicesContainer,
  InkChoicesContainer,
  'ink-container': InkContainer,
  InkContainer,
  'ink-section': InkSection,
  InkSection,
  'ink-sections': InkSections,
  InkSections,
  iterated: Iterated,
  Iterated,
  iterator: Iterator,
  Iterator,
  li: ListItem,
  ListItem,
  'linear-progress': LinearProgress,
  LinearProgress,
  link: Link,
  Link,
  list: List,
  List,
  'n-of': NOf,
  NOf,
  ol: OrderedList,
  OrderedList,
  'one-of': OneOf,
  OneOf,
  paper: Paper,
  Paper,
  permutation: Permutation,
  Permutation,
  'play-sound': PlaySound,
  PlaySound,
  print: Print,
  Print,
  progress: Progress,
  Progress,
  'restart-button': RestartButton,
  RestartButton,
  'rewind-button': RewindButton,
  RewindButton,
  section: Section,
  Section,
  'set-var': SetVariable,
  SetVar: SetVariable,
  'set-variable': SetVariable,
  SetVariable,
  'sound-controller': SoundController,
  SoundController,
  'sound-group-controller': SoundGroupController,
  SoundGroupController,
  'sound-group-view': SoundGroupView,
  SoundGroupView,
  'sound-group-view-title': SoundGroupViewTitle,
  SoundGroupViewTitle,
  'sound-manager-view': SoundManagerView,
  SoundManagerView,
  'sound-view': SoundView,
  SoundView,
  'sound-view-label': SoundViewLabel,
  SoundViewLabel,
  'sound-view-title': SoundViewTitle,
  SoundViewTitle,
  'stop-sound': StopSound,
  StopSound,
  'story-options-list': StoryOptionsList,
  StoryOptionsList,
  swipeable: Swipeable,
  Swipeable,
  'swipeable-drawer': SwipeableDrawer,
  SwipeableDrawer,
  tab: Tab,
  Tab,
  tabs: Tabs,
  Tabs,
  toolbar: Toolbar,
  Toolbar,
  typography: Typography,
  Typography,
  ul: UnorderedList,
  UnorderedList,
  'update-sound': UpdateSound,
  UpdateSound,
  'url-link': UrlLink,
  UrlLink,
  var: Variable,
  Var: Variable,
  variable: Variable,
  Variable,
});

export const getTagNameToComponentMap = () => ({
  ...baseComponents,
  ...authorComponentMutations,
});
