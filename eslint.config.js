const reactNativeConfig = require('@react-native/eslint-config/flat')

const BROKEN_PLUGINS = new Set(['ft-flow', 'eslint-comments'])

const sanitize = config => {
  const plugins = config.plugins ? { ...config.plugins } : undefined
  if (plugins) {
    for (const name of BROKEN_PLUGINS) {
      delete plugins[name]
    }
  }

  const rules = config.rules ? { ...config.rules } : undefined
  if (rules) {
    for (const key of Object.keys(rules)) {
      if ([...BROKEN_PLUGINS].some(name => key.startsWith(`${name}/`))) {
        delete rules[key]
      }
    }
  }

  return {
    ...config,
    ...(plugins ? { plugins } : {}),
    ...(rules ? { rules } : {}),
  }
}

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/Pods/**',
      'android/**',
      'ios/**',
      'vendor/**',
      'coverage/**',
      'babel.config.js',
      'metro.config.js',
      'jest.config.js',
      'eslint.config.js',
      '.prettierrc.js',
      'scripts/**',
    ],
  },
  ...reactNativeConfig.map(sanitize),
  {
    rules: {
      semi: ['error', 'never'],
    },
  },
]
