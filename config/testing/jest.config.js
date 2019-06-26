const includedDirectories = '(footers|headers|passages|plugins|src)';

/** @see https://jestjs.io/docs/en/configuration.html */
module.exports = {
  rootDir: '../../',

  testMatch: [
    /* Using <rootDir> breaks due to
     * https://github.com/facebook/jest/issues/7108. */
    `**/${includedDirectories}/**/?(*.)(spec|test).(j|t)s?(x)`,
  ],

  collectCoverageFrom: [
    `${includedDirectories}/**/*.{js,jsx,ts,tsx}`,
    '!**/*.d.ts',
  ],

  setupFiles: [
    'react-app-polyfill/jsdom',
  ],
  
  setupFilesAfterEnv: [
    '<rootDir>/config/testing/setupTests.ts',
  ],

  transform: {
    '^.+\\.[jt]sx?$': require.resolve('babel-jest'),
    '^.+\\.css$': '<rootDir>/config/testing/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/testing/fileTransform.js',
  },

  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.[jt]sx?$',
    '^.+\\.module\\.(css|less)$',
    'scripts/',
  ],

  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.(less)$': 'identity-obj-proxy',
  },

  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
    'jsx',
  ],

  resolver: 'jest-pnp-resolver',
};
