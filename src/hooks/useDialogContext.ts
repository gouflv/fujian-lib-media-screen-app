import constate from 'constate'
import { useState } from 'react'

type DialogDataType = 'article' | 'book' | 'media'

const [DialogProvider, useDialogContext] = constate(() => {
  const [visible, setVisible] = useState(false)

  const [type, setType] = useState<DialogDataType>()
  const [data, setData] = useState<any>()

  function openDialog(type: DialogDataType, data) {
    setType(type)
    setData(data)
    setVisible(true)
  }
  function closeDialog() {
    setVisible(false)
  }

  return {
    visible,
    type,
    data,
    openDialog,
    closeDialog
  }
})

DialogProvider.displayName = 'DialogProvider'

export { DialogProvider, useDialogContext }
