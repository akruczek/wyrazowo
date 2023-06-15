import * as React from 'react'
import WebView from 'react-native-webview'
import { ActivityIndicator } from 'react-native'
import { SafeAreaFlexContainer } from '@core/styled'
import { Header } from '@core/header/header'

export const Mania = () => {
  const MANIA_ENABLED = true
  const uri = 'https://scrabblemania.pl'

  return MANIA_ENABLED ? (
    <SafeAreaFlexContainer>
      <Header type="more" title="SCRABBLEMANIA" backButton />
      <WebView
        source={{ uri }}
        originWhitelist={['*']}
        renderLoading={() => <ActivityIndicator size="large" />}
      />
    </SafeAreaFlexContainer>
  ) : (
    null
  )
}
