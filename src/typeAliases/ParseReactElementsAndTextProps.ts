import {
  InkContainerOwnProps,
} from '../components/InkContainer/InkContainerOwnProps';

export type ParseReactElementsAndTextProps = Pick<
  InkContainerOwnProps,
  'bindings' | 'components' | 'dontMergeComponents'
>;
