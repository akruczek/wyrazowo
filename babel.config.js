module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: [ './src' ],
        extensions: ['.ios.ts', '.android.ts', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@core': './src/core',
          '_otils': './src/core/_otils/index.ts',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
