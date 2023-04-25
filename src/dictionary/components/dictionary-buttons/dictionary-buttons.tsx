import * as React from 'react'
import { CustomButton } from '@core/custom-button/custom-button'
import { DictionarySearchButtonContainer } from './dictionary-buttons.styled'
import { SearchButtonIcon } from '../../../dashboard/components/dashboard-buttons-and-modals/dashboard-buttons.styled'

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
