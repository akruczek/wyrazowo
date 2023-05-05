import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList } from 'react-native'
import { COLOR } from '@core/colors/colors.constants'
import { CLEAR_BUTTON_ID, KEYBOARD_BUTTONS, SEND_BUTTON_ID } from './custom-keyboard.constants'
import { CustomKeyboardButtonContainer, CustomKeyboardContainer, CustomKeyboardText } from './custom-keyboard.styled'

export const CustomKeyboard = () => {
  const renderItem = ({ item }: { item: string }) => {
    const getContent = () => {
      if (item === SEND_BUTTON_ID) {
        return <MaterialCommunityIcons name="send" color={COLOR.BLACK} />
      } else if (item === CLEAR_BUTTON_ID) {
        return <MaterialCommunityIcons name="backspace" color={COLOR.BLACK} />
      } else {
        return <CustomKeyboardText children={item} />
      }
    }

    const rowLength = KEYBOARD_BUTTONS?.[KEYBOARD_BUTTONS.findIndex((arr: string[]) => arr.includes(item))]?.length

    return (
      <CustomKeyboardButtonContainer rowLength={rowLength}>
        {getContent()}
      </CustomKeyboardButtonContainer>
    )
  }

  const renderRow = ({ item: keyboardButtonsGroup }: { item: any[] }) => (
    <FlatList
      renderItem={renderItem}
      data={keyboardButtonsGroup}
      contentContainerStyle={{ width: '100%', justifyContent: 'space-around', marginBottom: 2 }}
      horizontal
    />
  )

  return (
    <CustomKeyboardContainer>
      <FlatList
        data={KEYBOARD_BUTTONS}
        renderItem={renderRow}
      />
    </CustomKeyboardContainer>
  )
}
