import { Dialog } from '../../components/dialog/Dialog'
import { useDialogContext } from '../../hooks/useDialogContext'
import { Article } from './Article'

export const GlobalDialog = () => {
  const { visible, type, data, closeDialog } = useDialogContext()

  function renderDialogContent() {
    let Cmp: any
    switch (type) {
      case 'article':
        Cmp = <Article />
        break
      case 'media':
        Cmp = <Article />
        break
      case 'book':
        Cmp = <Article />
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
