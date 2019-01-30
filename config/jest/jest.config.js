/** @see https://jestjs.io/docs/en/configuration.html */

const includedDirectories = '(footers|headers|passages|plugins|src)';

module.exports = {
  testMatch: [
    `<rootDir>/**/${includedDirectories}/?(*.)(spec|test).{js,jsx,ts,tsx}`,
  ],

  collectCoverageFrom: [
    `**/${includedDirectories}/*.{js,jsx,ts,tsx}`,
    '!**/*.d.ts',
  ],

  rootDir: '../../',

  setupTestFrameworkScriptFile: '<rootDir>/config/jest/setupTests.ts',
  globalSetup: '<rootDir>/config/jest/globalSetup.js',
  setupFiles: [
    'react-app-polyfill/jsdom'
  ],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
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
