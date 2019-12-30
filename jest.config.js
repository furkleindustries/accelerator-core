const includedDirectories = '(footers|headers|passages|plugins|src)';

/** @see https://jestjs.io/docs/en/configuration.html */
module.exports = {
  rootDir: '.',
  verbose: true,
  //verbose: process.env.DEBUG ? true : false,

  testMatch: [
    /* Using <rootDir> breaks due to
     * https://github.com/facebook/jest/issues/7108. */
    `**/${includedDirectories}/**/?(*.)(spec|test).(j|t)s?(x)`,
  ],

  collectCoverageFrom: [
    `${includedDirectories}/**/*.{js,jsx,ts,tsx}`,
    '!**/*.d.ts',
    '!lib/',
  ],

  setupFiles: [
    'react-app-polyfill/jsdom',
  ],
  
  setupFilesAfterEnv: [
    '<rootDir>/config/testing/setupTests.ts',
  ],

  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.(less)$': 'identity-obj-proxy',
  },

  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
    'jsx',
    'md',
    'mdx',
  ],

  transform: {
    '^.+\\.jsx?$': require.resolve('babel-jest'),
    '^.+\\.tsx?$': require.resolve('ts-jest'),
    '^.+\\.css$': '<rootDir>/config/testing/cssTransform.js',
    '^.+\\.mdx?$': '<rootDir>/config/testing/mdxTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json|md|mdx)$)': '<rootDir>/config/testing/fileTransform.js',
  },

  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.[jt]sx?$',
    '^.+\\.module\\.(css|less)$',
    'scripts/',
  ],

  testEnvironment: 'jsdom',
  testURL: 'http://localhost',

  resolver: 'jest-pnp-resolver',
};
