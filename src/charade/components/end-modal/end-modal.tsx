import * as React from 'react'
import { useSelector } from 'react-redux'
import { CustomModalize, CustomModalizeRef } from '@core/custom-modalize/cutom-modalize'
import { useNavigation } from '@react-navigation/native'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { userStatisticsService } from '@core/user-statistics-service/user-statistics-service'
import { Tx } from '@core/tx'
import { SCREEN } from '../../../navigation/navigation.constants'
import { userUidSelector } from '../../../user/store/user.selectors'
import { EndModalButtonsContainer, EndModalContainer } from './end-modal.styled'

interface Props {
  modalizeRef: React.MutableRefObject<CustomModalizeRef | null>;
  success: boolean;
  word: string;
}

export const EndModal = ({ modalizeRef, success, word }: Props) => {
  const navigation = useNavigation<any>()
  const uid = useSelector(userUidSelector)

  const handleTryAgain = () => {
    navigation.navigate(SCREEN.CHARADE_MAIN)
  }

  const onOpened = async () => {
    if (uid) {
      if (success) {
        await userStatisticsService.updateSuccess(uid, 'charade')
        await userStatisticsService.updatePoints(uid, 10, 'charade')
      } else {
        await userStatisticsService.updateFailure(uid, 'charade')
        await userStatisticsService.updatePoints(uid, -10, 'charade')
      }
    }
  }

  return (
    <CustomModalize reference={modalizeRef} adjustToContentHeight onOpened={onOpened}>
      <EndModalContainer>
        <Tx local={success ? 'success' : 'failed'} spacings="0 0 L 0" XXL bold center />
        <Tx tx={word.toUpperCase()} spacings="0 0 L 0" XXL bold center />

        <EndModalButtonsContainer>
          <CustomButton color={COLOR.DARK_SEA_GREEN} onPress={handleTryAgain} local="try_again" />
        </EndModalButtonsContainer>
      </EndModalContainer>
    </CustomModalize>
  )
}
