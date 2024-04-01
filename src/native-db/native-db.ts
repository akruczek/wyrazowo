import { NativeModules } from 'react-native'
import { NativeDB } from './native-db.models'

const _nativeModule = NativeModules.DBModule

export const DB: NativeDB = {
  findPossibleWords: (
    allWords: string[],
    selectedLetters: string[],
    wordToExtend?: string,
  ): string[] => {
    _nativeModule.findPossibleWords(
      JSON.stringify(allWords),
      JSON.stringify(selectedLetters),
      wordToExtend,
    )

    return []
  },
  _nativeModule,
}
