module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts'
  ],

  resolver: 'jest-pnp-resolver',
  setupTestFrameworkScriptFile: '<rootDir>/src/setupTests.ts',
  globalSetup: '<rootDir>/scripts/generateManifests.js',

  setupFiles: [
    'react-app-polyfill/jsdom'
  ],

  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
    '<rootDir>/footers/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
    '<rootDir>/headers/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
    '<rootDir>/passages/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
    '<rootDir>/plugins/**/?(*.)(spec|test).{js,jsx,ts,tsx}'
  ],

  testEnvironment: 'jsdom',
  testURL: 'http://localhost',

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
  },

  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],

  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.(sass|scss)$': 'identity-obj-proxy'
  },

  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ]
}
