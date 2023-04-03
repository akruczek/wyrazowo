import { NativeModulesStatic } from 'react-native'

export interface NativeDB {
  findPossibleWords: (allWords: string[]) => string[];
  _nativeModule: NativeModulesStatic;
}
