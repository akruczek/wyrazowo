import * as React from 'react'
import { TouchableOpacity, Linking } from 'react-native'
import { Tx } from '@core/tx'
import { Template } from '@core/template/template'
import { AuthorGithubIcon, AuthorRowContainer, AuthorLinkedInIcon } from './author.styled'

export const Author = () => {
  const onGithubPress = () => {
    Linking.openURL('https://github.com/akruczek')
  }

  const onLinkedInPress = () => {
    Linking.openURL('https://linkedin.com/in/akruczek')
  }

  return (
    <Template type="more" local="about_author" backButton>
      <Tx tx="Adam Kruczek" spacings="XXS L" bold />

      <AuthorRowContainer>
        <AuthorGithubIcon />

        <TouchableOpacity onPress={onGithubPress}>
          <Tx tx="akruczek" bold link underline />
        </TouchableOpacity>
      </AuthorRowContainer>

      <AuthorRowContainer>
        <AuthorLinkedInIcon />

        <TouchableOpacity onPress={onLinkedInPress}>
          <Tx tx="akruczek" bold link underline />
        </TouchableOpacity>
      </AuthorRowContainer>
    </Template>
  )
}
