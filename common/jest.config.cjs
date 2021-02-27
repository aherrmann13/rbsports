module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(fp-ts)/)'],
};
