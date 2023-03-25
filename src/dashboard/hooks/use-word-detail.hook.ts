import * as React from 'react'
import * as R from 'ramda'

interface UseWordDetail {
  onLongPressWord: (word: string) => () => void;
  getWordsByLettersCount: () => string[][];
  detailedWord: null | string;
}

export const useWordDetail = (
  possibleWords: string[],
  wordDetailsModalRef: React.MutableRefObject<any>,
): UseWordDetail => {
  const MAX_RESULTS = 99

  const [ detailedWord, setDetailedWord ] = React.useState<null | string>(null)

  const getWordsByLettersCount = () => {
    let wordsToDisplay: string[][] = []

    const words = R.sortWith(
      [ R.descend(R.prop('length')) ],
      R.slice(0, MAX_RESULTS, possibleWords),
    )

    words.forEach((word: string) => {
      wordsToDisplay[word.length] = R.append(word, wordsToDisplay[word.length] ?? [])
    })

    return R.pipe<string[][][], string[][], string[][]>(
      R.reverse,
      R.filter(R.complement(R.isNil)),
    )(wordsToDisplay)
  }

  const onLongPressWord = (word: string) => () => {
    setDetailedWord(word)
    wordDetailsModalRef?.current?.open?.()
  }

  return { onLongPressWord, getWordsByLettersCount, detailedWord }
}
