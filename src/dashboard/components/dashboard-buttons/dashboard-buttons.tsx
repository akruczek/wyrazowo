import * as React from 'react'
import { COLOR } from '@core/colors/colors.constants'
import { CustomButton } from '@core/custom-button/custom-button'
import {
  ClearLettersButtonIcon, DashboardButtonsContainer, HistoryButtonIcon, SearchButtonIcon,
} from './dashboard-buttons.styled';

interface Props {
  openHistoryModal: () => void;
  historyAvailable: boolean;
  selectedLetters: string[];
  onSearch: () => void;
  handleClearSelectedLetters: () =>  void;
}

export const DashboardButtons = ({
  openHistoryModal, historyAvailable, selectedLetters, onSearch, handleClearSelectedLetters,
}: Props) => {
  return (
    <DashboardButtonsContainer>
      <CustomButton
        color={COLOR.DARK_SEA_GREEN}
        onPress={openHistoryModal}
        invisible={!historyAvailable}
        withHaptic
      >
        <HistoryButtonIcon />
      </CustomButton>

      <CustomButton
        invisible={selectedLetters.length < 2}
        onPress={onSearch}
        withHaptic
      >
        <SearchButtonIcon />
      </CustomButton>

      <CustomButton
        color={COLOR.FIRE_BRICK}
        invisible={!selectedLetters.length}
        onPress={handleClearSelectedLetters}
        withHaptic
      >
        <ClearLettersButtonIcon />
      </CustomButton>
    </DashboardButtonsContainer>
  )
}
