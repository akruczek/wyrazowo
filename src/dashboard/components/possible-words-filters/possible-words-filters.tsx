import * as React from 'react'
import * as R from 'ramda'
import { SearchHistoryFiltersItem, SearchHistoryFiltersList } from './possible-words-filters.styled'
import { Tx } from '@core/tx';

interface Props {
  maxLength: number;
}

export const SearchHistoryFilters = ({ maxLength }: Props) => {
  const data = R.pipe<[number], number[], number[]>(
    R.times(R.inc),
    R.reverse,
  )(maxLength ?? 0)

  const renderFilterItem = ({ item }: { item: number }) => (
    <SearchHistoryFiltersItem onPress={() => console.log(item)}>
      <Tx tx={item} />
    </SearchHistoryFiltersItem>
  )

  return (
    <SearchHistoryFiltersList
      renderItem={renderFilterItem}
      data={data}
    />
  )
}