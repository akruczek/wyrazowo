import * as React from 'react'
import { fetchClient } from '../../core/fetch-client/fetch-client'
import { parseSjpWordDetails } from '../helpers/parse-sjp-word-details.helper'

interface UseWordDefinitions {
  definitions: string[] | null;
}

export const useWordDefinitions = (
  word: string | null,
): UseWordDefinitions => {
  const [ definitions, setDefinitions ] = React.useState<string[] | null>(null)

  const fetchWordFromSjp = () => {
    const onSuccess = (response: Response) => {
      response.text().then((text: string) => {
        setDefinitions(parseSjpWordDetails(text))
      })
    }

    const onError = () => setDefinitions([])

    fetchClient(`https://sjp.pl/${word}`).get(onSuccess, onError)
  }

  React.useEffect(() => {
    if (word) {
      fetchWordFromSjp()
    }
  }, [ word ])

  return { definitions }
}
