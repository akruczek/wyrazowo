import * as React from 'react'
import { TouchableOpacity, Linking } from 'react-native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { Template } from '@core/template/template'
import {
  AuthorDescriptionLink, AuthorDescriptionText, AuthorGithubIcon, AuthorRowContainer, AuthorLinkedInIcon,
} from './author.styled'

export const Author = () => {
  const localize = useLocalize()

  const onGithubPress = () => {
    Linking.openURL('https://github.com/akruczek')
  }

  const onLinkedInPress = () => {
    Linking.openURL('https://linkedin.com/in/akruczek')
  }

  return (
    <Template type="more" title={localize().about_author} backButton>
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
    </Template>
  )
}
