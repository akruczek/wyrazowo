import * as React from 'react'
import { DictionaryRandomFiltersModel } from '../dictionary.models'

interface UseDictionaryRandomFilters {
  onApply: (minMax: [ number, number ]) => void;
  onClear: () => void;
  isFilterActive: boolean;
  filtersRef: React.MutableRefObject<null | DictionaryRandomFiltersModel>;
}

export const useDictionaryRandomFilters = ():UseDictionaryRandomFilters => {
  const [ isFilterActive, setFilterActive ] = React.useState(false)

  const filtersRef = React.useRef<null | DictionaryRandomFiltersModel>(null)

  const onApply = (minMax: [ number, number ]) => {
    setFilterActive(true)
    filtersRef.current = { ...filtersRef.current, minMax }
  }

  const onClear = () => {
    setFilterActive(false)
    filtersRef.current = null
  }

  return { onApply, onClear, isFilterActive, filtersRef }
}
