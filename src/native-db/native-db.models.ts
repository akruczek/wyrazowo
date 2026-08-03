export interface NativeDB {
  findPossibleWords: (
    allWords: string[],
    selectedLetters: string[],
    wordToExtend?: string,
  ) => Promise<string[]>
}
