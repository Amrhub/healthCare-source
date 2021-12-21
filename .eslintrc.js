/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
    // project: './tsconfig.json', | required for rules that need type information
    // but slows down linting considerably. could consider adding as a CI/prepush step
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/README.md
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'unused-imports',
    'jest',
  ],
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      files: ['src/**/*'],
      extends: ['plugin:unicorn/recommended'],
      // for some reason, unicorn specifies an ecmaVersion "latest"
      // which gives some issues with prefer-const
      parserOptions: {
        ecmaVersion: 2021,
      },
      rules: {
        'unicorn/no-null': 'off',
        'unicorn/no-await-expression-member': 'off',
        'unicorn/no-process-exit': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/prefer-node-protocol': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/import-style': 'off',
        'unicorn/no-useless-undefined': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/numeric-separators-style': 'off',
        'unicorn/prefer-query-selector': 'off',
        'unicorn/prefer-number-properties': 'off',
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/consistent-destructuring': 'off',
        'unicorn/no-nested-ternary': 'off',
        // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1079
        'unicorn/prefer-ternary': ['error', 'only-single-line'],
      },
    },
    {
      files: '*.tsx',
      rules: {
        // https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: true,
            types: {
              '{}': false,
              Function: false,
            },
          },
        ],
      },
    },
  ],
  // The commented lines are rules that gave warnings or errors when adding eslint,
  // but that we still want to fix (eventually, when changes are made to the files)
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/no-standalone-expect': 'error',
    'jest/prefer-expect-resolves': 'warn',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: [
          ['builtin', 'external'],
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'no-useless-escape': 'off', // suggestions break regex
    'react-hooks/exhaustive-deps': 'off', // maybe we want this at some point?
    'spaced-comment': 'error',
    'unused-imports/no-unused-imports': 'warn',
    '@typescript-eslint/no-explicit-any': 'off', // any has its uses ;)
    '@typescript-eslint/ban-ts-comment': 'off', // we want to be able to use @ts-ignore
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off', // this is a tricky one, maybe we should consider enabling it at some point
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'no-throw-literal': 'error',
    'no-duplicate-imports': 'error',
    'object-shorthand': ['error', 'always'],
  },
}
