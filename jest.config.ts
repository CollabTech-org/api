import type { Config } from 'jest'

const config: Config = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: './src/modules/',
  roots: ['../../test/unitary/'],
  testRegex: ['.*\\.spec\\.ts$'],
  coverageDirectory: '../../test/unitary/coverage',
  collectCoverageFrom: ['**/*.(t|j)s'],
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  testEnvironment: 'node',
}

export default config
