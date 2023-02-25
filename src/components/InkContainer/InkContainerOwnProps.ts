import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  InkDoneCallback,
} from './InkDoneCallback';
import {
  InkMutatorObject,
} from '../../ink-mutators/InkMutatorObject';
import {
  IReduxStoreAware,
} from '../../interfaces/IReduxStoreAware';
import {
  ISoundManagerAware,
} from '../../interfaces/ISoundManagerAware';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  OneOrMaybeReadonlyArray,
} from '../../typeAliases/OneOrMaybeReadonlyArray';
import type {
  ComponentType,
} from 'react';
import type {
  Story,
} from 'inkjs/engine/Story';

export interface InkContainerOwnProps
  extends
    IClassNameable,
    IReduxStoreAware,
    ISoundManagerAware
{
  readonly name: string;
  readonly components?: Record<string, ComponentType<any>>;
  readonly delayAfterChoice?: number;
  readonly delayClassName?: string;
  readonly doneCallbacks?: OneOrMaybeReadonlyArray<InkDoneCallback>;
  readonly dontMergeComponents?: boolean;
  readonly externalFunctions?: Record<string, (...args: Array<string | number>) => any>;
  readonly maxSwipeRight?: number;
  readonly mergeExtraVariablesIntoStoryState?: boolean;
  readonly mutatorObjects?: InkMutatorObject[];
  readonly observerCallback?: Story.VariableObserver;
  readonly variablesToMerge?: Partial<IStoryStateFrame>;
}
