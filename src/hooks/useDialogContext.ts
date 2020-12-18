import constate from 'constate'
import { useState } from 'react'

const [DialogProvider, useDialogContext] = constate(() => {
  const [visible, setVisible] = useState(false)

  const [data, setData] = useState<any>()

  function openDialog(data) {
    setData(data)
    setVisible(true)
  }
  function closeDialog() {
    setVisible(false)
  }

  return {
    visible,
    data,
    openDialog,
    closeDialog
  }
})

DialogProvider.displayName = 'DialogProvider'

export { DialogProvider, useDialogContext }
