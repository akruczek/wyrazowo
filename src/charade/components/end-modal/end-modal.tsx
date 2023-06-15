import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { userStatisticsService } from '@core/user-statistics-service/user-statistics-service'
import { SCREEN } from '../../../navigation/navigation.constants'
import { userUidSelector } from '../../../user/store/user.selectors'
import { CharadeEndModalize, EndModalButtonsContainer, EndModalContainer, EndModalTitle } from './end-modal.styled'

interface Props {
  modalizeRef: React.MutableRefObject<Modalize | null>;
  success: boolean;
  word: string;
}

export const EndModal = ({ modalizeRef, success, word }: Props) => {
  const localize = useLocalize()
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
    <CharadeEndModalize ref={modalizeRef} onOpened={onOpened}>
      <EndModalContainer>
        <EndModalTitle children={success ? localize().success : localize().failed} />
        <EndModalTitle children={word.toUpperCase()} />

        <EndModalButtonsContainer>
          <CustomButton color={COLOR.DARK_SEA_GREEN} onPress={handleTryAgain} title={localize().try_again} />
        </EndModalButtonsContainer>
      </EndModalContainer>
    </CharadeEndModalize>
  )
}
