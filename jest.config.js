module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  moduleNameMapper: {
    '@app/core': '<rootDir>/src/app/',
    '@testing': '<rootDir>/testing',
    '@environment': '<rootDir>/src/environments/environment.ts',
  },
  coverageDirectory: '<rootDir>/testing/coverage',
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/app-routing.module.ts',
    '!src/app/app.module.ts',
  ],
  transformIgnorePatterns: [
    "node_modules/(?!@ngrx)"
  ],
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  },
  testMatch: [
    '**/__tests__/**/*.(js|ts|tsx)',
    '**/?(*.)+(test).(js|ts|tsx)',
  ],
}