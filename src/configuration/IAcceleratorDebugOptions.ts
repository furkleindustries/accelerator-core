import {
  PassageNames,
} from '../passages/IPassagesMap';
import {
  IStoryStateFrame,
} from '../state/IStoryStateFrame';


export interface IAcceleratorDebugOptions {
  // Allows the debug argument to be passed to redux-undo. This may result in
  // a large amount of console noise. Please note loglines beginning with
  // `redux-undo` do not imply an action has been undone, but merely the
  // library indicating that the log arises from redux-undo. 
  readonly reduxUndoDebug?: boolean;

  // Turns off all animations and delays. This only works as well as the
  // functions which govern these timers respect this property, so don't expect
  // much if you're using external libraries. It does not do anything drastic
  // like setting animation-duration to 0 !important.
  readonly noTimings?: boolean;

  // Overrides the first passage after the start menu.
  readonly startPassageAfterMenu?: PassageNames | 'XLR8R_RANDOM';

  // Loops back to the start Ink module after done.
  readonly loopStartInkModule?: boolean;

  // Writes state at start.
  readonly storyState?: Partial<IStoryStateFrame>;

  // Starting Ink path string. Injected into the first <InkContainer /> in
  // the story.
  readonly startInkPathString?: string;

  // Starting Ink state. Injected into the first <InkContainer /> in the story.
  // This will overwrite any identically-named Accelerator or default Ink
  // state for that Ink module.
  readonly startInkState?: Record<string, string | number>;

  // Allows one to inject a value for the previous passage name. Can be useful
  // for testing stories midway through, or stubbing values for a passage which
  // relies on the last passage value for logic/routing.
  readonly stubLastPassageName?: PassageNames;
}
