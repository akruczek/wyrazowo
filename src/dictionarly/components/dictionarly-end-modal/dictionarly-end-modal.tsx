import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Tx } from '@core/tx'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { userStatisticsService } from '@core/user-statistics-service/user-statistics-service'
import { userUidSelector } from '../../../user/store/user.selectors'
import {
  DictionarlyEndModalButtonsContainer, DictionarlyEndModalContainer, DictionarlyEndModalize,
} from './dictionarly-end-modal.styled'

interface Props {
  modalizeRef: React.MutableRefObject<Modalize | null>;
  wordsLength: number;
  difficulty: number;
  state: boolean | null;
  word: string;
}

export const DictionarlyEndModal = ({ modalizeRef, wordsLength, difficulty, state, word }: Props) => {
  const localize = useLocalize()
  const navigation = useNavigation<any>()
  const uid = useSelector(userUidSelector)
  const [ end, setEnd ] = React.useState(false)

  const updateStatistics = async () => {
    if (uid) {
      if (state) {
        const points = Math.floor(10 * (wordsLength ? 2 : 1) * [ 1, 1.2, 1.5, 2 ][difficulty])
        await userStatisticsService.updateSuccess(uid, 'dictionarly')
        await userStatisticsService.updatePoints(uid, points, 'dictionarly')
      } else {
        await userStatisticsService.updateFailure(uid, 'dictionarly')
        await userStatisticsService.updatePoints(uid, -10, 'dictionarly')
      }
    }
  }

  React.useEffect(() => {
    if (end) {
      updateStatistics()
    }
  }, [ end ])

  const onOpened = React.useCallback(() => setEnd(true), [])
  const onClose = React.useCallback(() => setEnd(false), [])

  return (
    <DictionarlyEndModalize ref={modalizeRef} onOpened={onOpened} onClose={onClose}>
      <DictionarlyEndModalContainer>
        <Tx tx={state ? localize().success : localize().failed} XL />
        <Tx tx={word} error={!state} ok={!!state} XL />

        <DictionarlyEndModalButtonsContainer>
          <CustomButton color={COLOR.DODGER_BLUE} onPress={navigation.goBack} title={localize().try_again} />
        </DictionarlyEndModalButtonsContainer>
      </DictionarlyEndModalContainer>
    </DictionarlyEndModalize>
  )
}
