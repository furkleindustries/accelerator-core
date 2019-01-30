const includedDirectories = '(footers|headers|passages|plugins|src)';

/** @see https://jestjs.io/docs/en/configuration.html */
module.exports = {
  rootDir: '../../',

  testMatch: [
    `<rootDir>/${includedDirectories}/**/?(*.){spec,test}.{js,jsx,ts,tsx}`,
  ],

  collectCoverageFrom: [
    `${includedDirectories}/**/*.{js,jsx,ts,tsx}`,
    '!**/*.d.ts',
  ],

  setupTestFrameworkScriptFile: '<rootDir>/config/testing/setupTests.ts',
  globalSetup: '<rootDir>/config/testing/globalSetup.js',
  setupFiles: [
    'react-app-polyfill/jsdom',
  ],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/config/testing/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/testing/fileTransform.js',
  },

  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],

  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.(sass|scss)$': 'identity-obj-proxy',
  },

  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
    'jsx',
  ],

  resolver: 'jest-pnp-resolver',
};
