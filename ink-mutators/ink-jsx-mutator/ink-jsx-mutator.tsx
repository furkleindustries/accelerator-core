import {
  getNormalizedAcceleratorConfig,
} from '../../src/configuration/getNormalizedAcceleratorConfig';
import {
  InkMutatorObject,
} from '../../src/ink-mutators/InkMutatorObject';
import {
  parseJsx,
} from './parseJsx';

const {
  loggers: { error },
} = getNormalizedAcceleratorConfig();

const mutatorObject: InkMutatorObject = {
  name: 'ink-jsx-mutator',
  content: ({
    components = {},
    lines,
  }) => parseJsx({
    components,
    jsx: lines.map(({ text }) => text).join(''),
    onError: (err) => {
      error('There was an error while parsing JSX from an Ink document.');

      if (err) {
        error(err.toString());
      }
    },
  }),

  precedence: 0,
};

export default mutatorObject;
