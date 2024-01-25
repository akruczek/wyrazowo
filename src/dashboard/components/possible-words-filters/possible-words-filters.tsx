import * as React from 'react'
import * as R from 'ramda'
import { Pressable } from 'react-native'
import {
  SearchHistoryFiltersItem, SearchHistoryFiltersItemTx, SearchHistoryFiltersList,
} from './possible-words-filters.styled'

interface Props {
  maxLength: number;
  selectedFilter: number | null;
  selectFilter: React.Dispatch<React.SetStateAction<number | null>>;
}

export const SearchHistoryFilters = ({ maxLength, selectedFilter, selectFilter }: Props) => {
  const data = R.pipe<[number], number[], number[]>(
    R.times(R.inc),
    R.reverse,
  )(maxLength ?? 0)

  const renderFilterItem = ({ item }: { item: number }) => (
    <Pressable onPress={() => selectFilter(item)}>
      <SearchHistoryFiltersItem isSelected={selectedFilter === item}>
        <SearchHistoryFiltersItemTx tx={item} />
      </SearchHistoryFiltersItem>
    </Pressable>
  )

  return (
    <SearchHistoryFiltersList
      renderItem={renderFilterItem}
      data={data}
    />
  )
}