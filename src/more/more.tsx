import * as React from 'react'
import * as R from 'ramda'
import app from '../../package.json'
import { Template } from '@core/template/template'
import { ListedOption, OptionItem, EmptyOptions } from './components'
import { MoreOption } from './more.models'
import { useMoreOptions } from './hooks/use-more-options.hook'
import { MoreFlatList } from './more.styled'

export const More = () => {
  const { getOptions } = useMoreOptions()
  const renderItem = ({ item }: { item: MoreOption<any> }) => <OptionItem {...item} />

  return (
    <Template type="more" flex>
      <MoreFlatList
        renderItem={renderItem}
        ListEmptyComponent={EmptyOptions}
        ListFooterComponent={<ListedOption local="app_version" suffix={`: ${app.version}`} XS />}
        keyExtractor={R.propOr('', 'local')}
        data={getOptions()}
      />
    </Template>
  )
}
