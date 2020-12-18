import { Dialog } from '../../components/dialog/Dialog'
import { useDialogContext } from '../../hooks/useDialogContext'
import { ArticleContent } from './ArticleContent'

export const GlobalDialog = () => {
  const { visible, type, closeDialog } = useDialogContext()

  function renderDialogContent() {
    let Cmp: any
    switch (type) {
      case 'article':
        Cmp = <ArticleContent />
        break
      case 'media':
        Cmp = <ArticleContent />
        break
      case 'book':
        Cmp = <ArticleContent />
        break
    }
    return Cmp
  }

  return (
    <Dialog visible={visible} onCancel={closeDialog}>
      {renderDialogContent()}
    </Dialog>
  )
}
