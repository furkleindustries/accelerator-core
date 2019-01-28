type Return = { [key: string]: string };

/* Memoize the value. */
let acceleratorEnvVariables: Return | null = null;

export function getAcceleratorEnvVariables(): Return {
  /* Return the memoized value if it exists. */
  if (acceleratorEnvVariables) {
    return acceleratorEnvVariables;
  }

  const temp = require('dotenv-expand')(
    require('dotenv').config({ path: '.env' }),
  ).parsed;

  acceleratorEnvVariables = Object.keys(temp).reduce((obj, name) => {
    if (/^ACCELERATOR_[^_]/.test(name)) {
      obj[name] = temp[name];
    }

    return obj;
  }, {});
  
  return acceleratorEnvVariables as Return;
}
