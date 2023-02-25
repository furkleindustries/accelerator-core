const debugEnvRe = new RegExp(/dev|development|debug|test/i);
const envVar = process.env.NODE_ENV || '';
const envVarDebug = debugEnvRe.test(envVar);

export const isInDebugMode = (debugOverride = false) => {
  const isDebug = debugOverride || envVarDebug;
  return isDebug;
};
