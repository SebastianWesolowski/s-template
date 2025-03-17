module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],

  // Konfiguracja pokrycia kodu
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts?(x)',
    '!<rootDir>/src/**/*.{d.ts,index.ts,interface.ts,enum.ts,constant.ts}',
  ],

  // Mapowanie modułów
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // Konfiguracja ESM
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.mts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: '<rootDir>/tsconfig.json',
        useESM: true,
      },
    ],
  },

  // Ścieżki i ustawienia środowiska
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/', '/coverage/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Ustawienia mocków
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  maxWorkers: '50%',
};
