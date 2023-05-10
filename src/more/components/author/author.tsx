import * as React from 'react'
import { useTheme } from 'styled-components/native'
import { TouchableOpacity, Linking } from 'react-native'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { Header } from '@core/header/header'
import {
  AuthorContainer, AuthorDescriptionLink, AuthorDescriptionText,
  AuthorGithubIcon, AuthorRowContainer, AuthorLinkedInIcon,
} from './author.styled'

export const Author = () => {
  const localize = useLocalize()
  const theme = useTheme() as ThemeModel

  const onGithubPress = () => {
    Linking.openURL('https://github.com/akruczek')
  }

  const onLinkedInPress = () => {
    Linking.openURL('https://linkedin.com/in/akruczek')
  }

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="more" title={localize().about_author} backButton />

      <AuthorContainer>
        <AuthorDescriptionText children="Adam Kruczek" />

        <AuthorRowContainer>
          <AuthorGithubIcon />

          <TouchableOpacity onPress={onGithubPress}>
            <AuthorDescriptionLink children="akruczek" />
          </TouchableOpacity>
        </AuthorRowContainer>

        <AuthorRowContainer>
          <AuthorLinkedInIcon />

          <TouchableOpacity onPress={onLinkedInPress}>
            <AuthorDescriptionLink children="akruczek" />
          </TouchableOpacity>
        </AuthorRowContainer>
      </AuthorContainer>
    </SafeAreaFlexContainer>
  )
}
