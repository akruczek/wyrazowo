export const getDictionaryWords = (words: string[]) => words
  .map((str: string) => str.length > 0 ? str.split('.') : null)
  .filter((elements: string[] | null) => elements !== null)
  .flat<any, number>()
