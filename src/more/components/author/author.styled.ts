import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getThemeProp } from '@core/styled/theme'
import { TEXT_SIZE } from '@core/text/text.constants'
import { SPACING } from '@core/styled'

export const AuthorGithubIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'github',
  color: getThemeProp('textSecondary')(props),
  size: TEXT_SIZE.XXXL,
}))`
  margin-right: ${SPACING.XS}px;
`

export const AuthorRepoIcon = styled(MaterialCommunityIcons).attrs((props) => ({
  name: 'source-repository',
  color: getThemeProp('textSecondary')(props),
  size: TEXT_SIZE.XXXL,
}))`
  margin-right: ${SPACING.XS}px;
`

export const AuthorLinkedInIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'linkedin',
  color: getThemeProp('textSecondary')(props),
  size: TEXT_SIZE.XXXL,
}))`
  margin-right: ${SPACING.XS}px;
`

export const AuthorRowContainer = styled.View`
  flex-direction: row;
  margin: ${SPACING.S}px ${SPACING.M}px;
  align-items: center;
  align-self: center;
`

export const AuthorImage = styled.Image`
  width: 200px;
  height: 200px;
  align-self: center;
  border-radius: 100px;
`
