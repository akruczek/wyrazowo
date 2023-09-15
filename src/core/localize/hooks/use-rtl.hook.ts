import { useLocalize } from "@core/hooks/use-localize.hook"

export const useRTL = (): boolean => {
  const localize = useLocalize()
  return Boolean(localize()?.rtl)
}
