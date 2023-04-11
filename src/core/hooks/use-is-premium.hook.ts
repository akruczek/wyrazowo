import { useSelector } from 'react-redux'
import { premiumSelector } from '../../settings/store/settings.selectors'

export const useIsPremium = (): boolean => {
  const premium = useSelector(premiumSelector)
  return premium > 0
}
