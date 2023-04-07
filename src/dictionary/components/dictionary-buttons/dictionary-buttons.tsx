import * as React from 'react'
import { DictionarySearchButtonContainer } from './dictionary-buttons.styled'
import { CustomButton } from '../../../core/custom-button/custom-button'
import { SearchButtonIcon } from '../../../dashboard/dashboard.styled'

interface Props {
  onSearch: () => void;
}

export const DictionaryButtons = ({ onSearch }: Props) => (
  <DictionarySearchButtonContainer>
    <CustomButton onPress={onSearch} withHaptic>
      <SearchButtonIcon />
    </CustomButton>
  </DictionarySearchButtonContainer>
)
