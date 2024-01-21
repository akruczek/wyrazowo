module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: [ './src' ],
        extensions: ['.ios.ts', '.android.ts', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@core': './src/core',
          '@e2e': './e2e',
          'wrzw': './src/core/wrzw/index.ts',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
