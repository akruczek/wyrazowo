import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getThemeProp } from '@core/styled/theme'
import { TEXT_SIZE } from '@core/text/text.constants'
import styled from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'

export const AuthorDescriptionText = styled.Text`
  font-size: ${TEXT_SIZE.M}px;
  font-weight: bold;
  color: ${getThemeProp('textPrimary')};
  margin: 5px 20px;
`

export const AuthorDescriptionLink = styled.Text`
  font-size: ${TEXT_SIZE.M}px;
  font-weight: bold;
  color: ${COLOR.DODGER_BLUE};
  text-decoration: underline;
`

export const AuthorGithubIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'github',
  color: getThemeProp('textSecondary')(props),
  size: TEXT_SIZE.XXXL,
}))`
  margin-right: 10px;
`

export const AuthorLinkedInIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'linkedin',
  color: getThemeProp('textSecondary')(props),
  size: TEXT_SIZE.XXXL,
}))`
  margin-right: 10px;
`

export const AuthorRowContainer = styled.View`
  flex-direction: row;
  margin: 10px 20px;
  align-items: center;
`
