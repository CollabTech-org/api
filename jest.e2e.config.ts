import type { Config } from 'jest'

const config: Config = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: './src/app/',
  roots: ['../../test/e2e/'],
  testRegex: ['.*\\.e2e\\.spec\\.ts$'],
  coverageDirectory: '../../test/e2e/coverage',
  collectCoverageFrom: ['**/*.(t|j)s'],
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  testEnvironment: 'node',
}

export default config
