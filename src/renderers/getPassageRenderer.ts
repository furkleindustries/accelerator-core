import {
  configurationDefaults,
} from '../configuration/configurationDefaults';
import {
  getNormalizedAcceleratorConfig,
} from '../configuration/getNormalizedAcceleratorConfig';
import {
  IPassageRendererConstructor,
} from './IPassageRendererConstructor';
import {
  assertValid,
} from 'ts-assertions';

const config = getNormalizedAcceleratorConfig();

let passageRenderer: IPassageRendererConstructor | null = null;
export function getPassageRenderer(): IPassageRendererConstructor {
  if (!passageRenderer) {
    let rendererName;
    if (config.rendererName) {
      rendererName = config.rendererName;
    } else {
      rendererName = configurationDefaults.rendererName;
    }

    const validator = (renderer: any) => typeof renderer === 'function';
    passageRenderer = assertValid(
      /* Get the path relative to the renderers/ folder. */
      require(`../../renderers/${rendererName}`)[rendererName],
      '',
      validator,
    );
  }

  return passageRenderer!;
}
