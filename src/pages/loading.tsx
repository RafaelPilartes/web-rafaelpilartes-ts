import { useTranslation } from 'react-i18next'

function Loading() {
  const { t } = useTranslation('common')
  return (
    <>
      <div id="load">{t('loading')}</div>
    </>
  )
}

export default Loading
