import { useMemo } from 'react'
import { Dialog } from '../../components/dialog/Dialog'
import { useDialogContext } from '../../hooks/useDialogContext'
import { Article, DOCType } from '../../typing'
import { ArticleContent } from './ArticleContent'
import { MediaContent } from './MediaContent'

export const GlobalDialog = () => {
  const { visible, data, closeDialog } = useDialogContext()

  const type = useMemo(() => data && (data as Article).docType, [data])

  function renderDialogContent() {
    let Cmp: any
    switch (type) {
      case DOCType.NEWS:
        Cmp = <ArticleContent />
        break
      case DOCType.VIDEO:
        Cmp = <MediaContent />
        break
      // case 'book':
      //   Cmp = <ArticleContent />
      //   break
    }
    return Cmp
  }

  return (
    <Dialog visible={visible} onCancel={closeDialog} destroyOnClose>
      {renderDialogContent()}
    </Dialog>
  )
}
