const {
  getAllCompiledCodeDirectories,
} = require('./config/webpack/getAllCompiledCodeDirectories');
const includedDirectories = `(${
  getAllCompiledCodeDirectories()
    .filter((dir) => !new RegExp(/\/ink/).test(dir))
    .join('|')
})`;

const {
  paths: { moduleFileExtensions },
} = require('./config/paths');

/** @see https://jestjs.io/docs/en/configuration.html */
module.exports = {
  rootDir: '.',
  verbose: process.env.DEBUG ? true : false,

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
    '<rootDir>/config/testing/setupTests.js',
  ],

  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.(less)$': 'identity-obj-proxy',
  },

  moduleFileExtensions,

  transform: {
    '^.+\\.jsx?$': require.resolve('babel-jest'),
    '^.+\\.tsx?$': require.resolve('ts-jest'),
    '^.+\\.css$': '<rootDir>/config/testing/cssTransform.js',
    '^.+\\.mdx?$': '<rootDir>/config/testing/mdxTransform.js',
    [`^(?!.*\\.(${moduleFileExtensions.join('|')})$)`]: `<rootDir>/config/testing/fileTransform.js`,
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
