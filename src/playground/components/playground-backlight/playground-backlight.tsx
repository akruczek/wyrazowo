import * as React from 'react'
import {
  PlaygroundBacklightContainer, PlaygroundColumnBacklight, PlaygroundRowBacklight,
} from './playground-backlight.styled'

interface Props {
  advancedSearchIndexes: [ number, number ] | null;
  onPressColumn: () => void;
  onPressRow: () => void;
}

export const PlaygroundBacklight = ({ advancedSearchIndexes, onPressColumn, onPressRow }: Props) => {
  if (!advancedSearchIndexes) {
    return null
  }

  return (
    <PlaygroundBacklightContainer>
      <PlaygroundColumnBacklight onPress={onPressColumn} index={advancedSearchIndexes[0]} />
      <PlaygroundRowBacklight onPress={onPressRow} index={advancedSearchIndexes[1]} />
    </PlaygroundBacklightContainer>
  )
}
