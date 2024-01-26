import * as React from 'react'
import * as R from 'ramda'
import { Pressable } from 'react-native'
import {
  SearchHistoryFiltersItem, SearchHistoryFiltersItemTx, SearchHistoryFiltersList,
} from './possible-words-filters.styled'

interface Props {
  maxLength: number;
  lengthFilter: number | null;
  setLengthFilter: (lengthFilter: number | null) => void;
}

export const SearchHistoryFilters = ({ maxLength, lengthFilter, setLengthFilter }: Props) => {
  const initialMaxLength = React.useRef<number | null>(null)

  React.useEffect(() => {
    initialMaxLength.current = maxLength
  }, [])

  const data = R.pipe<[number], number[], number[]>(
    R.times(R.inc),
    R.reverse,
  )(initialMaxLength.current ?? maxLength ?? 0)

  const renderFilterItem = ({ item }: { item: number }) => (
    <Pressable onPress={() => setLengthFilter(item)}>
      <SearchHistoryFiltersItem isSelected={lengthFilter === item}>
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