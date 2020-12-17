import { Modal } from 'antd'
import { ModalProps } from 'antd/es/modal'
import { FC } from 'react'
import styled from 'styled-components'
import { borderRadius } from '../../styles/theme'
import { px2vw } from '../../styles/utils'

interface DialogProps extends ModalProps {}

export const Dialog: FC<DialogProps> = props => {
  const { ...modalProps } = props

  function onClose(e) {
    if (modalProps.onCancel) {
      modalProps.onCancel(e)
    }
  }

  return (
    <StyledModal
      closable={false}
      footer={null}
      wrapClassName={'dialog'}
      {...modalProps}
    >
      <ModalClose onClick={onClose} />
      {props.children}
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  width: 96vw !important;
  height: 90vh;
  display: flex;
  color: #333;

  .ant-modal-content {
    flex: auto;
    display: flex;
    ${borderRadius}
  }

  .ant-modal-body {
    flex: auto;
    display: flex;
    flex-direction: column;
    padding: ${px2vw(40)} ${px2vw(60)};
  }
`

// eslint-disable-next-line import/first
import close from '../../assets/close.png'

const ModalClose = styled.div`
  position: absolute;
  top: 35px;
  right: 35px;
  width: 50px;
  height: 50px;
  background-image: url(${close});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`
