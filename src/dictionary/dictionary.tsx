import * as React from 'react'
import WebView from 'react-native-webview'
import { ActivityIndicator } from 'react-native'
import { DictionarySafeAreaContainer } from './dictionary.styled'

export const Dictionary = () => {
  const uri = 'https://sjp.pl'

  return (
    <DictionarySafeAreaContainer>
      <WebView
        source={{ uri }}
        originWhitelist={['*']}
        renderLoading={() => <ActivityIndicator size="large" />}
      />
    </DictionarySafeAreaContainer>
  )
}
