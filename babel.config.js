module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@core': './src/core',
          wrzw: './src/core/wrzw/index.ts',
          '@assets': './src/assets',
        },
      },
    ],
    // Must be listed last
    'react-native-worklets/plugin',
  ],
}
