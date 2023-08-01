import * as React from 'react'
import { newVersionAvailableAlert } from '@core/alerts/new-version-avaialble-alert'
import { useLocalize } from './use-localize.hook'
import packageJson from '../../../package.json'

export const useNewVersionAlert = () => {
  const [ latestVersion, setLatestVersion ] = React.useState<string>('')

  const localize = useLocalize({ version: latestVersion })

  const fetchRepoTags = async () => {
    const response = await fetch('https://api.github.com/repos/akruczek/wyrazowo/tags')
    const json = await response.json()

    if (json?.[0]?.name && !json[0].name.includes(packageJson.version)) {
      setLatestVersion(json[0].name?.split('v')?.[1])
      setTimeout(() => {
        newVersionAvailableAlert(localize)
      })
    }
  }

  React.useEffect(() => {
    fetchRepoTags()
  }, [])
}
