import * as React from 'react'
import * as R from 'ramda'
import wrzw from 'wrzw'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { MoreOption } from '../more.models'
import { hapticFeedbackEnabledSelector } from '../../settings/store/settings.selectors'
import { userDisplayNameSelector, userImageSelector } from '../../user/store/user.selectors'
import { SCREEN } from '../../navigation/navigation.constants'
import { setHapticFeedbackEnabledAction } from '../../settings/store/settings.slice'

type Options = [
  MoreOption,
  MoreOption,
  MoreOption,
  MoreOption,
  MoreOption,
  MoreOption,
  MoreOption,
  MoreOption,
] | []

interface UseMoreOptions {
  getOptions: () => Options;
}

export const useMoreOptions = (): UseMoreOptions => {
  const dispatch = useDispatch()
  const navigation = useNavigation<any>()

  const hapticFeedbackEnabled = useSelector(hapticFeedbackEnabledSelector)
  const imageUrl = useSelector(userImageSelector)
  const displayName = useSelector(userDisplayNameSelector)

  const isPending = R.any(
    R.isNil,
    [ hapticFeedbackEnabled ],
  )

  // const handleChangeHapticFeedback = (_hapticFeedbackEnabled: boolean) =>
  //   dispatch(setHapticFeedbackEnabledAction(wrzw.toNumberFlag(_hapticFeedbackEnabled)))

  const getOptions: () => Options =
    React.useCallback(() => isPending ? [] : [
      {
        tx: displayName,
        onChange: () => navigation.navigate(SCREEN.MORE_USER),
        imageUrl,
      },
      {
        local: 'language',
        onChange: () => navigation.navigate(SCREEN.MORE_LANGUAGE),
        icon: 'translate',
      },
      {
        local: 'theme',
        onChange: () => navigation.navigate(SCREEN.MORE_THEME),
        icon: 'theme-light-dark',
      },
      {
        local: 'haptic_feedback',
        // value: !!hapticFeedbackEnabled,
        onChange: () => navigation.navigate(SCREEN.MORE_HAPTIC),
        icon: 'vibrate',
      },
      {
        local: 'scrabblemania',
        onChange: () => navigation.navigate(SCREEN.MORE_MANIA),
        icon: 'web',
      },
      {
        local: 'help',
        onChange: () => navigation.navigate(SCREEN.MORE_HELP),
        icon: 'help',
      },
      {
        local: 'advanced_settings',
        onChange: () => navigation.navigate(SCREEN.DEVELOPER),
        icon: 'wrench',
        // TODO: hidden: !__DEV__,
      },
      {
        local: 'about_author',
        onChange: () => navigation.navigate(SCREEN.MORE_AUTHOR),
        icon: 'account-question',
      },
    ], [ isPending, displayName, imageUrl ])

    return { getOptions }
}
