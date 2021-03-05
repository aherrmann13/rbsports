module.exports = {
  preset: 'ts-jest',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/index.ts',
    '<rootDir>/src/rbsports.ts',
    '<rootDir>/src/service.ts',
  ],
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
};
