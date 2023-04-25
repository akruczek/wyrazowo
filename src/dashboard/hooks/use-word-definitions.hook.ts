import * as React from 'react'
import { O } from '_otils'
import { fetchClient } from '@core/fetch-client/fetch-client'
import { SJP_BASE_PATH } from '@core/fetch-client/fetch-client.constants'
import { parseSjpWordDetails } from '../helpers'

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

    fetchClient(`${SJP_BASE_PATH}/${word}`).get(onSuccess, onError)
  }

  React.useEffect(() => {
    if (word) {
      fetchWordFromSjp()
    }

    if (O.isNull(word)) {
      setDefinitions(null)
    }
  }, [ word ])

  return { definitions }
}
