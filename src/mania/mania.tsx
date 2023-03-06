import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import WebView from 'react-native-webview'
import { ManiaSafeAreaContainer } from './mania.styled'

export const Mania = () => {
  const MANIA_ENABLED = true
  const uri = 'https://scrabblemania.pl'

  return MANIA_ENABLED ? (
    <ManiaSafeAreaContainer>
      <WebView
        source={{ uri }}
        renderLoading={() => <ActivityIndicator size="large" />}
      />
    </ManiaSafeAreaContainer>
  ) : (
    null
  )
}
