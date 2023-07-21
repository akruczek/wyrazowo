import * as React from 'react'
import * as R from 'ramda'
import app from '../../package.json'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { Template } from '@core/template/template'
import { ListedOption, OptionItem, EmptyOptions } from './components'
import { MoreOption } from './more.models'
import { useMoreOptions } from './hooks/use-more-options.hook'
import { MoreFlatList } from './more.styled'

export const More = () => {
  const localize = useLocalize()

  const { getOptions } = useMoreOptions()

  const versionTitle = `${localize().app_version}: ${app.version}`

  const renderItem = ({ item }: { item: MoreOption<any> }) => (
    <OptionItem {...item} />
  )

  return (
    <Template type="more" flex>
      <MoreFlatList
        renderItem={renderItem}
        ListEmptyComponent={EmptyOptions}
        ListFooterComponent={<ListedOption title={versionTitle} XS />}
        keyExtractor={R.propOr('', 'title')}
        data={getOptions()}
      />
    </Template>
  )
}
