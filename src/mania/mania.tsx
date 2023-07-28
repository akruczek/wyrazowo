import * as React from 'react'
import WebView from 'react-native-webview'
import { ActivityIndicator } from 'react-native'
import { Template } from '@core/template/template'

export const Mania = () => {
  const MANIA_ENABLED = true
  const uri = 'https://scrabblemania.pl'

  return MANIA_ENABLED ? (
    <Template type="more" local="scrabblemania" backButton>
      <WebView
        source={{ uri }}
        originWhitelist={['*']}
        renderLoading={() => <ActivityIndicator size="large" />}
      />
    </Template>
  ) : (
    null
  )
}
