import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList } from 'react-native'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { CLEAR_BUTTON_ID, KEYBOARD_BUTTONS, SEND_BUTTON_ID } from './custom-keyboard.constants'
import {
  CustomKeyboardButtonContainer, CustomKeyboardContainer, CustomKeyboardRowList, CustomKeyboardText,
} from './custom-keyboard.styled'

interface Props {
  onPress: (letter: string) => void;
  greenLetters: string[];
  yellowLetters: string[];
  redLetters: string[];
}

export const CustomKeyboard = ({ onPress, greenLetters, yellowLetters, redLetters }: Props) => {
  const handlePress = (letter: string) => () => {
    onPress(letter)
  }

  const renderItem = ({ item }: { item: any }) => {
    const getContent = () => {
      if (item === SEND_BUTTON_ID) {
        return <MaterialCommunityIcons name="send" color={COLOR.BLACK} size={TEXT_SIZE.S} />
      } else if (item === CLEAR_BUTTON_ID) {
        return <MaterialCommunityIcons name="backspace" color={COLOR.BLACK} size={TEXT_SIZE.S} />
      } else {
        return <CustomKeyboardText children={item} />
      }
    }

    const rowLength = KEYBOARD_BUTTONS?.[KEYBOARD_BUTTONS.findIndex((arr: string[]) => arr.includes(item))]?.length

    const backgroundColor = greenLetters.includes(item)
      ? COLOR.DARK_SEA_GREEN
      : yellowLetters.includes(item)
        ? COLOR.GOLD
        : redLetters.includes(item)
          ? COLOR.FIRE_BRICK
          : COLOR.DIM_GREY_LIGHTER

    return (
      <CustomKeyboardButtonContainer
        backgroundColor={backgroundColor}
        onPress={handlePress(item)}
        rowLength={rowLength}
      >
        {getContent()}
      </CustomKeyboardButtonContainer>
    )
  }

  const renderRow = ({ item: keyboardButtonsGroup }: { item: any[] }) => (
    <CustomKeyboardRowList renderItem={renderItem} data={keyboardButtonsGroup} />
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
