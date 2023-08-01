import * as React from 'react'
import { TouchableOpacity, Linking } from 'react-native'
import { Tx } from '@core/tx'
import { Template } from '@core/template/template'
import {
  AuthorGithubIcon, AuthorRowContainer, AuthorLinkedInIcon, AuthorImage, AuthorRepoIcon,
} from './author.styled'

export const Author = () => {
  const [ repositoryLink, setRepositoryLink ] = React.useState<null | string>(null)

  const onGithubPress = () => {
    Linking.openURL('https://github.com/akruczek')
  }

  const onLinkedInPress = () => {
    Linking.openURL('https://linkedin.com/in/akruczek')
  }

  const onRepositoryPress = () => {
    if (repositoryLink) {
      Linking.openURL(repositoryLink)
    }
  }

  React.useEffect(() => {
    fetch('https://api.github.com/repos/akruczek/wyrazowo').then((response: Response) => {
      response.json().then((response: any) => {
        setRepositoryLink(response?.['html_url'])
      })
    })
  }, [])

  return (
    <Template type="more" local="about_author" backButton>
      <AuthorImage
        source={{ uri: 'https://avatars.githubusercontent.com/u/31205827?s=400&u=ebf2945da54074afc4103aa0e860c189f1773323&v=4' }}
      />

      <Tx tx="Adam Kruczek" spacings="XXS L" bold center />

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

      {repositoryLink ? (
        <AuthorRowContainer>
          <AuthorRepoIcon />

          <TouchableOpacity onPress={onRepositoryPress}>
            <Tx tx="wyrazowo" bold link underline />
          </TouchableOpacity>
        </AuthorRowContainer>
      ) : null}
    </Template>
  )
}
