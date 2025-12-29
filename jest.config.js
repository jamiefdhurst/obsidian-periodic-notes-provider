/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'CommonJS',
          verbatimModuleSyntax: false,
        },
      },
    ],
    '^.+\\.m?js$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'CommonJS',
          verbatimModuleSyntax: false,
          allowJs: true,
        },
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(svelte|esm-env)/)'],
  moduleFileExtensions: ['js', 'd.ts', 'ts', 'mjs'],
  coverageReporters: ['html', 'text', 'cobertura'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!<rootDir>/node_modules/'],
};
