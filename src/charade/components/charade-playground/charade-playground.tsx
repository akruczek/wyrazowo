import * as React from 'react'
import * as R from 'ramda'
import { FlatList } from 'react-native'
import { CharadePlaygroundRow, CharadePlaygroundRowsList } from './charade-playground.styled'
import { CharadeField } from '../charade-field/charade-field'

interface Props {
  count: number;
}

export const CharadePlayground = ({ count }: Props) => {
  const data = R.times(R.identity, count)
  const renderItem = ({ item: index }) => <CharadeField count={count} />
  const renderRow = ({ item: rowIndex }) => <CharadePlaygroundRow {...{ data, count, renderItem }} />

  return (
    <CharadePlaygroundRowsList renderItem={renderRow} data={data} />
  )
}
