import 'server-only'

import StartlingByEachStep from './page.client'
import { getAppData } from '@/i18n'

// 步步惊心
export default async function Page() {
  const { locale, pathname, i18n } = await getAppData()
  const i18nProps: GeneralI18nProps = {
    locale,
    pathname,
    i18n: {
      dict: i18n.dict
    }
  }

  return <StartlingByEachStep { ...i18nProps } />
}
