import { NativeModulesStatic } from 'react-native'

export interface NativeDB {
  findPossibleWords: (
    allWords: string[],
    selectedLetters: string[],
    wordToExtend?: string,
  ) => string[];
  _nativeModule: NativeModulesStatic;
}
