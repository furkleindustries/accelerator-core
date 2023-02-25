import {
  InkModule,
} from '../components/InkContainer/InkModule';
import {
  InkLineObject,
} from '../components/InkSection/InkLineObject';
import type {
  ComponentType,
} from 'react';
import type {
  Story,
} from 'inkjs/engine/Story';

export interface InkMutatorProps {
  readonly components?: Record<string, ComponentType<any>>;
  readonly inkModule?: InkModule;
  readonly lines: readonly InkLineObject[];
  readonly onError?: (err: Error | string) => void;
  readonly story?: Story;
}
