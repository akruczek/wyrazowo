import * as React from 'react'
import * as R from 'ramda'
import { Tx } from '@core/tx'
import { COLOR } from '@core/colors/colors.constants'
import { SwitchButtonContainer, SwitchButtonsContainer, SwitchButtonsGroupsContainer } from './switch-button.styled'

interface Props {
  value: number;
  labels: string[];
  colors?: COLOR[];
  elementsInRowCount?: number;
  onChange: (newValue: number) => void;
}

export const SwitchButton = ({ value, labels, colors, elementsInRowCount, onChange }: Props) => {
  const isActive = (index: number) => index === value
  const _onChange = (index: number) => () => onChange(index)
  const getIndex = (groupIndex: number, index: number) => (elementsInRowCount ?? 0) * groupIndex + index

  const _labels = elementsInRowCount ? R.splitEvery(elementsInRowCount, labels) : [ labels ]

  return (
    <SwitchButtonsGroupsContainer>
      {_labels.map((labelsGroup: string[], groupIndex: number) => (
        <SwitchButtonsContainer key={labelsGroup.join('')}>
          {labelsGroup.map((label: string, index: number) => (
            <SwitchButtonContainer
              color={colors?.[getIndex(groupIndex, index)]}
              onPress={_onChange(getIndex(groupIndex, index))}
              isActive={isActive(getIndex(groupIndex, index))}
              key={label}
            >
              <Tx tx={label} white={isActive(getIndex(groupIndex, index))} themeColor="textSecondary" bold />
            </SwitchButtonContainer>
          ))}
        </SwitchButtonsContainer>
      ))}
    </SwitchButtonsGroupsContainer>
  )
}
