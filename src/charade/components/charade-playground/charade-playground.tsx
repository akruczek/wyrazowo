import * as React from 'react'
import * as R from 'ramda'
import { CharadePlaygroundRow, CharadePlaygroundRowsList } from './charade-playground.styled'
import { CharadeField } from '../charade-field/charade-field'

interface Props {
  count: number;
}

export const CharadePlayground = ({ count }: Props) => {
  const rows = R.times(R.identity, count + 1)
  const fields = R.times(R.identity, count)

  const renderItem = ({ item: index }) => <CharadeField count={count} />
  const renderRow = ({ item: rowIndex }) => <CharadePlaygroundRow data={fields} {...{ count, renderItem }} />

  return (
    <CharadePlaygroundRowsList renderItem={renderRow} data={rows} />
  )
}
