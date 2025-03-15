module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    experimentalVmModules: true,
  },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts?(x)',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.interface.ts',
    '!<rootDir>/src/**/*.enum.ts',
    '!<rootDir>/src/**/*.constant.ts',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  verbose: true,
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
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/', '/coverage/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  maxWorkers: '50%',
};
