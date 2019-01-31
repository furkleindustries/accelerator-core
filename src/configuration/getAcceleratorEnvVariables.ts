import {
  configurationDefaults,
} from './configurationDefaults';
import {
  IAcceleratorEnvVariables,
} from './IAcceleratorEnvVariables';

/* Memoize the value. */
let acceleratorEnvVariables: IAcceleratorEnvVariables | null = null;

export function getAcceleratorEnvVariables(): IAcceleratorEnvVariables {
  /* Return the memoized value if it exists. */
  if (acceleratorEnvVariables) {
    return acceleratorEnvVariables;
  }

  acceleratorEnvVariables = Object.freeze<IAcceleratorEnvVariables>({
    ...configurationDefaults,
    ...Object.keys(process.env).reduce((obj, name) => {
      if (/^ACCELERATOR_[^_]/.test(name)) {
        const trimmedName = name.slice(12).toLowerCase();
        let value: string | string[] | number | boolean | undefined | null = process.env[name];
        if (!Number.isNaN(Number(value))) {
          value = Number(value);
        } else if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        } else if (value === 'undefined') {
          value = undefined;
        } else if (value === 'null') {
          value = null;
        } else {
          try {
            const maybeArr = JSON.parse(value!);
            if (Array.isArray(maybeArr)) {
              value = maybeArr;
            }
          } catch (err) {
            /* Do nothing. */
          }
        }


        obj[trimmedName] = value;
      }

      return obj;
    }, {}),
  });

  return acceleratorEnvVariables;
}
