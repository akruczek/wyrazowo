import * as React from 'react'
import * as R from 'ramda'
import { O } from '_otils';
import { reverseNotNilWords } from '../helpers/reverse-not-nil-words.helper';

interface UseWordDetail {
  onLongPressWord: (word: string) => () => void;
  getWordsByLettersCount: () => string[][];
  detailedWord: null | string;
  isPending: boolean;
  maxReached: boolean;
  loadMore: () => void;
}

export const useWordDetail = (
  possibleWords: string[],
  wordDetailsModalRef: React.MutableRefObject<any>,
): UseWordDetail => {
  const RESULTS_COUNT = 30

  const [ resultsCountMultiplier, setResultsCountMultiplier ] = React.useState(1)

  const [ detailedWord, setDetailedWord ] = React.useState<null | string>(null)
  const [ isPending, setPending ] = React.useState(false)

  const [ maxReached, setMaxReached ] = React.useState(
    O.ifElse(false, possibleWords.length <= RESULTS_COUNT, !possibleWords.length)
  )

  const getWordsByLettersCount = () => {
    let wordsToDisplay: string[][] = []

    const words = R.sortWith(
      [ R.descend(R.prop('length')) ],
      R.slice(0, RESULTS_COUNT * resultsCountMultiplier, possibleWords),
    )

    words.forEach((word: string) => {
      wordsToDisplay[word.length] = R.append(word, wordsToDisplay[word.length] ?? [])
    })

    return reverseNotNilWords(wordsToDisplay)
  }

  const onLongPressWord = (word: string) => () => {
    setDetailedWord(word)
    wordDetailsModalRef?.current?.open?.()
  }

  const loadMore = () => {
    setPending(true)

    setTimeout(() => {
      const maxCount = O.inc(resultsCountMultiplier) * RESULTS_COUNT

      if (maxCount >= possibleWords.length) {
        setMaxReached(true)
      }

      setResultsCountMultiplier(R.inc)
      setPending(false)
    }, 100)
  }

  return { onLongPressWord, getWordsByLettersCount, isPending, detailedWord, maxReached, loadMore }
}
