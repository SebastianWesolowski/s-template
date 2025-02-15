const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testPathIgnorePatterns: ['<rootDir>/e2e'],
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@components': '<rootDir>/src/components',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@lib': '<rootDir>/src/lib',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@styles': '<rootDir>/src/styles',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@app': '<rootDir>/src/app',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@utils': '<rootDir>/src/utils',
    '^@configs/(.*)$': '<rootDir>/src/configs/$1',
    '^@configs': '<rootDir>/src/configs',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@assets': '<rootDir>/src/assets',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: false,
        isolatedModules: true,
        tsconfig: '<rootDir>/tsconfig.json',
        sourceMap: true,
      },
    ],
  },
};

module.exports = createJestConfig(customJestConfig);
